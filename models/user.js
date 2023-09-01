import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Hey! I already know an account with this mail!"],
        required: [true, "I really need an email here..."]
    },
    username: {
        type: String,
        required: [true, "We need to know what to call you!"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Sorry but this username is not valid, it should contain 8-20 alphanumeric letters and be unique (cuz you are!)"]
    },
    image: {
        type: String,
    }
});

//if a model "User" exists, return that else create a new one and then return it 
const User = models.User || model("User", UserSchema);

export default User;