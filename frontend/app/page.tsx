"use client"
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation' 
import { useAuth } from '../context/AuthContext'

type LoginResponse = {
  result: boolean
  reason: string | null
}

function Login(){

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth();
  const router = useRouter()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // GET /?userId=... を防ぐ
    setReason('')
    setIsLoading(true)

  const response = await fetch("/api/request/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      password,
    }),
  });

  const result = await response.json();

  if (result.result) {
    await login();
    router.push("/home");
  } else {
    alert(result.reason);
  }

  }


    return (
        <>
            <h1>ログイン</h1>
            <br/>
            <form onSubmit={handleLogin}>
            <label>ユーザID</label>
            <input type="text" id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} required />
            <br/>
            <label>パスワード</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <br/>
            <button name="demo" type="button" onClick={() => router.push('/home')}>
                ログイン(デモ)
            </button>
            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '認証中...' : 'ログイン'}
            </button>
            </form>

            {reason && <p role="alert">{reason}</p>}
        </>
    )
}

export default Login