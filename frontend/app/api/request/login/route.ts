import { NextResponse } from 'next/server';

type LoginRequest = {
  userId: string;
  password: string;
};

export async function POST(request: Request) {

  const body: LoginRequest = await request.json();

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/request/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  const data = await springResponse.json();

  const response = NextResponse.json(data, {
  status: springResponse.status,
  });

  // Spring Bootから受け取ったJWT Cookieをブラウザへ渡す
  springResponse.headers.getSetCookie().forEach((cookie) => {
  response.headers.append("set-cookie", cookie);
  });

  return response;

}