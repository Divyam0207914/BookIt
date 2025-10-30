import { connectToDatabase } from "@/lib/db";
import Experience from "@/models/Experience";

export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find();
    return Response.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch experiences" }), {
      status: 500,
    });
  }
}
