import { NextRequest, NextResponse } from "next/server";
import { countSignatures, insertSignature } from "@/lib/signatures";
import { isValidIndianMobile, normalizeMobile } from "@/lib/validation";

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

    const normalizedMobile = normalizeMobile(mobile);

    if (!isValidIndianMobile(normalizedMobile)) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9" },
        { status: 400 }
      );
    }

    const id = await insertSignature({
      name: name.trim(),
      profession: profession.trim(),
      mobile: normalizedMobile,
      location: location.trim(),
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("POST /api/signatures failed:", error);
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
  } catch (error) {
    console.error("GET /api/signatures failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch signature count" },
      { status: 500 }
    );
  }
}
