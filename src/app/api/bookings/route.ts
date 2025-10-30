import { connectToDatabase } from "@/lib/db";
import Booking from "@/models/Booking";
import Experience from "@/models/Experience";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const data = await req.json();
    console.log("📦 Incoming booking data:", data);

    const { experienceId, name, email, date, time, totalPrice, promoCode } = data;

    
    if (!experienceId || !date || !time) {
      console.log("Missing required fields");
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }


    const experience = await Experience.findById(experienceId);
    if (!experience) {
      console.log(" Experience not found");
      return new Response(JSON.stringify({ error: "Experience not found" }), {
        status: 404,
      });
    }

    


    if (!experience.availableSlots || !Array.isArray(experience.availableSlots)) {
      console.log("availableSlots missing or invalid in DB");
      return new Response(
        JSON.stringify({ error: "No available slots configured for this experience" }),
        { status: 500 }
      );
    }

    
    const targetSlot = experience.availableSlots.find(
      (s: any) => s.date === date && s.time === time
    );

    if (!targetSlot) {
      console.log("Slot not found for date/time:", date, time);
      return new Response(JSON.stringify({ error: "Slot not found" }), {
        status: 404,
      });
    }

    if (targetSlot.booked) {
      console.log("Slot already booked");
      return new Response(JSON.stringify({ error: "Slot already booked" }), {
        status: 400,
      });
    }


    targetSlot.booked = true;
    await experience.save();


    const booking = await Booking.create({
      experienceId,
      name: name || "Guest",
      email: email || "guest@example.com",
      date,
      time,
      totalPrice,
      promoCode,
      success: true,
    });


    return new Response(
      JSON.stringify({ success: true, booking, message: "Booking confirmed!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error details:", error);
    return new Response(JSON.stringify({ error: "Booking failed" }), {
      status: 500,
    });
  }
}
