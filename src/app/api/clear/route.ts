
import { connectToDatabase } from "@/lib/db";
import Experience from "@/models/Experience";

export async function DELETE() {
  try {
    await connectToDatabase();
    await Experience.deleteMany({});
    console.log("All experiences cleared");
    return Response.json({ message: "All experiences cleared" });
  } catch (error) {
    console.error(" Error clearing experiences:", error);
    return new Response(JSON.stringify({ error: "Failed to clear experiences" }), {
      status: 500,
    });
  }
}
