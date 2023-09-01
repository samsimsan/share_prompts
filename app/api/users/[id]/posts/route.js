//-----------------------------------------------------
//      This is the api to "GET" the posts based on the params given
//-----------------------------------------------------

// connect to the db using the method that I created:
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {  //params helps you to access dynamic vaiables from the api route such as [id]

    try {
        await connectToDB(); //we need to connect to the db everytime as it is a lambda function

        const prompts = await Prompt.find({
            creator: params.id //gets the posts from that specific creator/id
        }).populate("creator"); //get all prompts and populate it with the creator value

        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 });
    }

}