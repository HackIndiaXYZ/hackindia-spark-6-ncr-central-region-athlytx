from cryptography.fernet import Fernet

def encrypt_file(file_bytes: bytes) -> tuple[bytes, str]:
    """
    Encrypt file using Fernet symmetric encryption
    Returns: (encrypted_data, encryption_key)
    """
    # Generate key
    key = Fernet.generate_key()
    fernet = Fernet(key)
    
    # Encrypt
    encrypted_data = fernet.encrypt(file_bytes)
    
    # Return encrypted data and key (key should be stored securely)
    return encrypted_data, key.decode()

def decrypt_file(encrypted_data: bytes, encryption_key: str) -> bytes:
    """
    Decrypt file using stored key
    """
    fernet = Fernet(encryption_key.encode())
    decrypted_data = fernet.decrypt(encrypted_data)
    return decrypted_data
