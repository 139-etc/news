import { NextResponse } from 'next/server';

type RegistRequest = {
  registUserId: string;
  registPassword: string;
}

export async function POST(request: Request) {

  const clone = request.clone();

  console.log("生の本文:", await clone.text());

  const body: RegistRequest = await request.clone().json();

  console.log("body = ",body);

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/request/regist`,
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
  
  return response;

}