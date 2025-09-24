import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("Form data received:", body);
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("From email:", process.env.RESEND_FROM_EMAIL);

    const result = await resend.emails.send({
      from: `Illuminora <${process.env.RESEND_FROM_EMAIL}>`,
      to: "hello@illuminora.co.in",
      replyTo: body.email,
      subject: `New Contact Form: ${body.selectedProject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${body.firstName} ${body.lastName}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Message:</b> ${body.message}</p>
      `,
    });

    console.log("Email sent successfully:", result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ 
      success: false, 
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message?: string }).message || "Unknown error" : "Unknown error"
    }, { status: 500 });
  }
}