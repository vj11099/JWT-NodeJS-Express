import "dotenv/config";
import jwt from "jsonwebtoken";

const key = process.env.SECRET_KEY;

export const authorize = (req, res, next) => {
  // console.log(req.headers.cookie);
  try {
    const token = req.headers.cookie.split("=")[1];
    if (token) {
      jwt.verify(token, key, (err, decodedToken) => {
        if (err) {
          res.clearCookie("jwt");
          return res.status(401).json({ message: "Token invalid" });
        } else {
          res.locals.userid = decodedToken.id;
          next();
        }
      });
    } else {
      console.log("Unauthorized");
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // next();
};
