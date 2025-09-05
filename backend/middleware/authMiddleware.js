const jwt = require("jsonwebtoken");


const authenticationMiddlware = function (req, res, next) {
    const authHeader = req.headers["authorization"];

    
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

    console.log(req.headers)

     const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    if(!token) {
      return  res.json({
            message: "No token provided"
        });
    };

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData.userId;
    next();
};

module.exports = authenticationMiddlware;