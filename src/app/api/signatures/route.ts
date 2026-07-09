import { NextRequest, NextResponse } from "next/server";
import { countSignatures, insertSignature } from "@/lib/signatures";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, profession, mobile, location } = body;

    if (!name?.trim() || !profession?.trim() || !mobile?.trim() || !location?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    const id = await insertSignature({
      name: name.trim(),
      profession: profession.trim(),
      mobile: mobile.trim(),
      location: location.trim(),
    });

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json(
      { error: "Failed to save signature" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await countSignatures();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch signature count" },
      { status: 500 }
    );
  }
}
