import type { APIRoute } from "astro";
import { findPerson } from "../../googleAPI";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
     // Validate the data - you'll probably want to do more than this
  if (!name) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  let guests = await findPerson(name);
  console.log(guests);
  return new Response(
    JSON.stringify({
      message: "Success!",
      data: guests,
    }),
    { status: 200 }
  );
};
