import { NextResponse } from 'next/server';

type RegistRequest = {
  resetUserId: string;
  resetPassword1: string;
  resetPassword2: string;
  email: string;
}

export async function POST(request: Request) {

  const body: RegistRequest = await request.clone().json();

  const springResponse = await fetch(
    `${process.env.SPRING_BOOT_API_BASE_URL}/api/request/reset`,
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