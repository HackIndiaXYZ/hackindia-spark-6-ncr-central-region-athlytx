from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, health, diet, ai_engine, nft

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ATHLYX API",
    description="Verifiable Athlete Health Credentials on Polygon",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(health.router, prefix="/api/health", tags=["Health Records"])
app.include_router(diet.router, prefix="/api/diet", tags=["Diet Tracking"])
app.include_router(ai_engine.router, prefix="/api/ai", tags=["AI Engine"])
app.include_router(nft.router, prefix="/api/nft", tags=["NFT Credentials"])

@app.get("/")
def root():
    return {
        "message": "ATHLYX API - Verifiable Athlete Health Credentials",
        "status": "active",
        "version": "1.0.0"
    }

@app.get("/health-check")
def health_check():
    return {"status": "healthy"}
