import User from "../models/users.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const key = process.env.SECRET_KEY;

//error handling
const handleValidation = (err) => {
  let errors = { email: "", password: "" };

  //error for duplicate email
  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(
      (err) => (errors[err.path] = err.message)
    );
  }

  if (err.message === "incorrect email") {
    errors.email = "incorrect email";
  }
  if (err.message === "incorrect password") {
    errors.password = "incorrect password";
  }

  return errors;
  // return;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, key, {
    expiresIn: maxAge,
  });
};

export const post_signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json(handleValidation(err));
  }
};

export const post_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(201).json({ user: user._id });
  } catch (err) {
    return res.status(400).json(handleValidation(err));
  }
};

export const get_userlist = async (req, res) => {
  const data = await User.userlist(res);
  res.status(200).json(data);
};

export const post_logout = (req, res) => {
  if (req.headers.cookie) {
    res.clearCookie("jwt");
    return res.send("user logged out");
  }
  return res.send("Login first!");
};
