import type { APIRoute } from "astro";
import { findPerson } from "../../googleAPI";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const song = data.get("song");
     // Validate the data - you'll probably want to do more than this
  if (!name || !song) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  let guest = findPerson(name);
  return new Response(
    JSON.stringify({
      message: "Success!",
      name: guest[0].Name,
    }),
    { status: 200 }
  );
};
