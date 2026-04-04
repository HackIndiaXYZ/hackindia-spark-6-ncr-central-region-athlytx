from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.blockchain_service import mint_credential_nft
from pydantic import BaseModel

router = APIRouter()

class MintNFTRequest(BaseModel):
    user_id: int
    credential_type: str  # "HEALTH_CLEARED", "FITNESS_MILESTONE", etc.
    ipfs_metadata: str

class MintNFTResponse(BaseModel):
    success: bool
    token_id: int | None
    transaction_hash: str | None
    message: str

@router.post("/mint", response_model=MintNFTResponse)
def mint_nft_credential(request: MintNFTRequest, db: Session = Depends(get_db)):
    """
    Mint NFT credential on Polygon
    """
    try:
        # Get user
        from app.models.user import User
        user = db.query(User).filter(User.id == request.user_id).first()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Mint NFT
        token_id, tx_hash = mint_credential_nft(
            athlete_address=user.wallet_address,
            athlete_id=user.athlete_id,
            credential_type=request.credential_type,
            ipfs_hash=request.ipfs_metadata,
            validity_days=365
        )
        
        return MintNFTResponse(
            success=True,
            token_id=token_id,
            transaction_hash=tx_hash,
            message="NFT credential minted successfully"
        )
    
    except Exception as e:
        return MintNFTResponse(
            success=False,
            token_id=None,
            transaction_hash=None,
            message=f"Error minting NFT: {str(e)}"
        )

@router.get("/credentials/{athlete_id}")
def get_athlete_credentials(athlete_id: str):
    """
    Get all NFT credentials for an athlete
    """
    from app.services.blockchain_service import get_athlete_nfts
    
    try:
        credentials = get_athlete_nfts(athlete_id)
        return {"athlete_id": athlete_id, "credentials": credentials}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
