import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Contact form submission:", data)

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      data,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
