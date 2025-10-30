import { connectToDatabase } from "@/lib/db";
import Experience from "@/models/Experience";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 


  try {
    await connectToDatabase();
    const experience = await Experience.findById(id);

    if (!experience) {
      return new Response(JSON.stringify({ error: "Experience not found" }), { status: 404 });
    }

    return Response.json(experience);
  } catch (error: any) {
    console.error(" Error fetching experience:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

