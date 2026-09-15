import { NextResponse } from "next/server";

export async function GET(request: Request) {

  console.log("ブラウザから届いたCookie:",request.headers.get("cookie"));

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/auth/me`,
    {
      method: "GET",

      // ブラウザから受け取ったCookieをSpring Bootへ渡す
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  return new NextResponse(null, {
    status: springResponse.status,
  });
}