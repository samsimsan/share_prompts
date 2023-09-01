//model for a new prompt:
import mongoose, { Schema, model, models } from "mongoose";

const PromptScheme = new Schema({
    //the one who created the prompt:
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User", // refer to the User schema -> one user can create multiple prompts -> one-to-many

    },
    //the prompt details:
    prompt: {
        type: String,
        required: [true, "Prompt is required!"],
    },
    //the tag associated with the prompt:
    tag: {
        type: String,
        required: [true, "a tag is required!"],
    }
});

//if a model "Prompt" exists, return that else create a new one and then return it 
const Prompt = models.Prompt || model("Prompt", PromptScheme);

export default Prompt;