
import jwt from "jsonwebtoken";
const JWT_SECRET = "sweetshopsecret"; // keep same everywhere

export default function auth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : null;
  if (!token) return res.status(401).json({ message: "Invalid authorization format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, email }
   
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}




















