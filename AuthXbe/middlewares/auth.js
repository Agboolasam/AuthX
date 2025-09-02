import JWT from "jsonwebtoken";
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token is required" });
  }
  const token = header.split(" ")[1];
  JWT.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.user = decoded;
    next();
  });
}

export default verifyToken;
