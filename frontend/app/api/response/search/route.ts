import { NextResponse } from "next/server";

export async function GET() {

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/response/search`
  );

  console.log("status: ",await springResponse.status);
  

  const data = await springResponse.json();

  return NextResponse.json(data, {
    status: springResponse.status,
  });
}