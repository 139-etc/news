import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/auth/logout`,
    {
      method: "POST",
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  const response = new NextResponse(null, {
    status: springResponse.status,
  });

  springResponse.headers.getSetCookie().forEach((cookie) => {
    response.headers.append("set-cookie", cookie);
  });

  return response;
}