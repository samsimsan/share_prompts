//-----------------------------------------------------
//      This is the api to "GET" the posts based on the params given
//-----------------------------------------------------

// connect to the db using the method that I created:
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {

    try {
        await connectToDB(); //we need to connect to the db everytime as it is a lambda function

        const prompts = await Prompt.find({}).populate("creator"); //get all prompts and populate it with the creator value

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
                'CDN-Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
                'Vercel-CDN-Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            }

        });

    } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 });
    }

}