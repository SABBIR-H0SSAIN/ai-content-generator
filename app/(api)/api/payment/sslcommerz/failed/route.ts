import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    return NextResponse.json({ message: "Payment failed" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
