import jwt from "jsonwebtoken";

// middleware function
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401); // unauthorized
  }

  // Remove "Bearer " prefix
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // forbidden

    // Store the user ID so routes can use it

    req.user = { id: decoded.id };

    next();
  });
};

export default auth;
