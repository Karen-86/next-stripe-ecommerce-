// // /app/api/checkout/route.ts
// import { NextResponse } from "next/server";
// import { stripe } from "@/lib/Stripe";

// export async function POST(req: Request) {
//   try {
//     const { line_items } = await req.json();

//     if (!line_items || !Array.isArray(line_items)) {
//       return NextResponse.json({ error: "Invalid line_items format" }, { status: 400 });
//     }

//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${baseUrl}/success`,
//       cancel_url: `${baseUrl}/cart`,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error: any) {
//     console.error("Stripe checkout error:", error);
//     return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
//   }
// }


export async function POST() {
  return new Response(JSON.stringify({ message: 'Dummy placeholder to prevent errors' }), {
    status: 501
  });
}