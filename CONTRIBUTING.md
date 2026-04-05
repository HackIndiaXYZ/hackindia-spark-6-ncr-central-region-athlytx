# Contributing to ATHLYX

Thank you for your interest in contributing to ATHLYX! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Use the bug report template
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

### Suggesting Features

1. Check if the feature has been suggested
2. Use the feature request template
3. Explain:
   - The problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Impact on existing features

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Update documentation
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## Coding Standards

### Python (Backend)

- Follow PEP 8
- Use type hints
- Write docstrings
- Maximum line length: 100 characters
- Use Black for formatting

```python
def calculate_risk_score(user_id: int) -> RiskScore:
    """
    Calculate injury risk score for an athlete.
    
    Args:
        user_id: The athlete's user ID
        
    Returns:
        RiskScore object with score and recommendations
    """
    pass
```

### JavaScript/React (Frontend)

- Use ES6+ features
- Follow Airbnb style guide
- Use functional components
- Write PropTypes or TypeScript
- Use meaningful variable names

```javascript
const DietTracker = ({ userId }) => {
  const [meals, setMeals] = useState([]);
  
  // Component logic
  
  return (
    <div className="diet-tracker">
      {/* JSX */}
    </div>
  );
};
```

### Solidity (Smart Contracts)

- Follow Solidity style guide
- Use latest stable version
- Write comprehensive tests
- Document all functions
- Use OpenZeppelin contracts

```solidity
/**
 * @dev Mints a new credential NFT
 * @param athleteAddress The athlete's wallet address
 * @param athleteId The athlete's unique ID
 * @return tokenId The minted token ID
 */
function mintCredential(
    address athleteAddress,
    string memory athleteId
) public onlyOwner returns (uint256) {
    // Implementation
}
```

## Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Smart Contract Tests

```bash
cd blockchain
npx hardhat test
```

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

Examples:
```
feat: Add diet tracking for Indian foods
fix: Resolve IPFS upload timeout issue
docs: Update API documentation
```

## Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

Examples:
```
feature/nft-minting
fix/risk-calculation-bug
docs/api-endpoints
```

## Review Process

1. All PRs require at least one review
2. CI/CD must pass
3. Code coverage should not decrease
4. Documentation must be updated
5. Breaking changes require discussion

## Project Structure

```
athlyx/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── models/   # Database models
│   │   ├── routers/  # API endpoints
│   │   └── services/ # Business logic
│   └── tests/        # Backend tests
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── store/
│   └── tests/        # Frontend tests
└── blockchain/       # Smart contracts
    ├── contracts/
    ├── scripts/
    └── test/
```

## Getting Help

- Read the documentation
- Check existing issues
- Ask in discussions
- Join our Discord (coming soon)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to contributor calls

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ATHLYX! 🚀
