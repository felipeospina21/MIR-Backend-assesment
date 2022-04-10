const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    const [tokenType, tokenValue] = req.headers.authorization.split(" ");
    const verifiedToken = jwt.verify(tokenValue, process.env.SECRET_TOKEN_KEY);

    if (tokenType === "Bearer" && verifiedToken) {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: 'unauthorized' });
  }
}

module.exports = isAuthenticated
