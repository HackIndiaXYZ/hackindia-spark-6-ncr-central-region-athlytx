from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.health_record import HealthRecord
from app.services.ipfs_service import upload_to_ipfs
from app.services.encryption_service import encrypt_file
from pydantic import BaseModel

router = APIRouter()

class HealthRecordResponse(BaseModel):
    id: int
    record_type: str
    ipfs_hash: str
    description: str | None
    uploaded_at: str

    class Config:
        from_attributes = True

@router.post("/upload", response_model=HealthRecordResponse)
async def upload_health_record(
    user_id: int,
    record_type: str,
    description: str | None = None,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload medical record to IPFS (encrypted)
    """
    # Read file
    file_bytes = await file.read()
    
    # Encrypt
    encrypted_data, encryption_key = encrypt_file(file_bytes)
    
    # Upload to IPFS
    ipfs_hash = upload_to_ipfs(encrypted_data)
    
    # Save to database
    health_record = HealthRecord(
        user_id=user_id,
        record_type=record_type,
        ipfs_hash=ipfs_hash,
        encrypted_key=encryption_key,
        description=description
    )
    db.add(health_record)
    db.commit()
    db.refresh(health_record)
    
    return health_record

@router.get("/records/{user_id}", response_model=list[HealthRecordResponse])
def get_user_health_records(user_id: int, db: Session = Depends(get_db)):
    records = db.query(HealthRecord).filter(HealthRecord.user_id == user_id).all()
    return records
