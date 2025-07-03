import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  return NextResponse.json({ message: "Payment canceled" });
};
