//-----------------------------------------------------
//      This is the api to create a new post
//-----------------------------------------------------

// connect to the db using the method that I created:
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//standard way to create a post route. It should also have a "res" along with the "req", but in this, we don't need it.
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json(); //get the information from the reqest body:

    try {       //connect to db
        await connectToDB();        //wait for checking for the db connection status
        const newPrompt = new Prompt({ creator: userId, prompt, tag }); //creating a new schema
        await newPrompt.save();     //wait for the new schema to be made

        return new Response(JSON.stringify(newPrompt), { status: 201 });        // created
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });  // 500 is server error
    }
}