const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json("Token is not valid");
  
        req.user = decoded; // 🔥 This is important (contains id and role)
        console.log("✅ Token verified. Full decoded payload:", decoded);
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  };
  
module.exports = { verifyToken };



const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(403).json("Admin access required!");
        }
    });
};

module.exports = { verifyToken, verifyTokenAdmin };
