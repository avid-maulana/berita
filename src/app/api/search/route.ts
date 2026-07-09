import { NextResponse } from "next/server";
import { NewsAPI } from "@/lib/api";

export async function GET() {
  try {
    const news = await NewsAPI.all();

    return NextResponse.json(news);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}