import { NextResponse } from "next/server";

export const runtime = "nodejs";

const notForSale = {
  error:
    "No-Show Ops is not for sale. Checkout is not available and no payment session can be created.",
} as const;

export async function POST() {
  return NextResponse.json(notForSale, { status: 503 });
}
