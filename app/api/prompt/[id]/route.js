import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//to get a particular prompt: GET(read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB(); //we need to connect to the db everytime as it is a lambda function
        const prompt = await Prompt.findById(params.id).populate("creator"); //get prompts based on id, the id is dynamic
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 });
    }

}

//to edit a existing tag: PATCH( update)
export const PATCH = async (request, { params }) => {
    //get the new prompt to update:
    const { prompt: newprompt, tag: newtag } = await request.json();
    try {
        await connectToDB();
        //get the old prompt:
        const existingPrompt = await Prompt.findById(params.id);
        // if i don't find the existingprompt, then show status 404:
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
        //if i Did find, then replace the old with the new:
        existingPrompt.prompt = newprompt;
        existingPrompt.tag = newtag;

        //save the new changes to the prompt
        await existingPrompt.save();
        return new Response("Successfully updated the Prompts", { status: 200 })


    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 })
    }
}

//to delete the existing prompt: DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        // directly go ahead by deleting the prompt:
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt is deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete teh prompt", { status: 500 });
    }
}