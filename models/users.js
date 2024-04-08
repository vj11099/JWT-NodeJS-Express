import { Schema, model } from "mongoose";
import validator from "validator";
import { genSalt, hash, compare } from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be atleast 6 characters long"],
  },
});

//Hashing the created password
userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

//login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

userSchema.statics.userlist = async function (res) {
  const data = await this.find().select("-password -__v");
  return data;
};

const User = model("user", userSchema);

export default User;
