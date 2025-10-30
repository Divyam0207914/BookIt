export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return new Response(
        JSON.stringify({ valid: false, message: "Promo code is required" }),
        { status: 400 }
      );
    }

    
    const promos: Record<string, number> = {
      SAVE10: 0.1,   // 10% off
      FLAT100: 100,  // Flat ₹100 off
    };

    const normalizedCode = code.toUpperCase();
    const discount = promos[normalizedCode];

    if (!discount) {
      return new Response(
        JSON.stringify({ valid: false, message: "Invalid promo code" }),
        { status: 404 }
      );
    }

  
    return new Response(
      JSON.stringify({
        valid: true,
        discount,
        type: discount < 1 ? "percent" : "flat", 
        message:
          discount < 1
            ? `You got ${(discount * 100).toFixed(0)}% off!`
            : `You saved ₹${discount}!`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Promo validation error:", error);
    return new Response(
      JSON.stringify({ valid: false, message: "Server error. Please try again." }),
      { status: 500 }
    );
  }
}
