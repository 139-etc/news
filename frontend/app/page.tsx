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
  const [registUserId, setRegistUserId] = useState('')
  const [registPassword, setRegistPassword] = useState('')
  const [resetUserId, setResetUserId] = useState('')
  const [resetPassword1, setResetPassword1] = useState('')
  const [resetPassword2, setResetPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [registReason, setRegistReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

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

  const handleRegist = async (event: FormEvent<HTMLFormElement>) => {
    const userIdRegex = /^[!-~]{8,16}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$/;

    if (!userIdRegex.test(registUserId)) {
      alert("ユーザIDは8文字以上16文字以内の半角英数字と記号で入力してください。");
      setIsLoading(false);
      return;
    }

    if (!passwordRegex.test(registPassword)) {
      alert("パスワードは8文字以上16文字以内で、半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります。");
      setIsLoading(false);
      return;
    }
    
    event.preventDefault() // GET /?userId=... を防ぐ

  const response = await fetch("/api/request/regist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      registUserId,
      registPassword,
    }),
  });

  const registResult = await response.json();

  if (registResult.result) {
    alert("ユーザ登録が完了しました。ログインしてください。");
  } else {
    alert(registResult.reason)
  }
}

  const handleReset =  async (event: FormEvent<HTMLFormElement>) => {
    const userIdRegex = /^[!-~]{8,16}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$/;

    if (!userIdRegex.test(resetUserId)) {
      alert("ユーザIDは8文字以上16文字以内の半角英数字と記号で入力してください。");
      setIsLoading(false);
      return;
    }

    if(resetPassword1 != resetPassword2){
      alert("新しいパスワードと新しいパスワード(確認用)が合っていません。");
      setIsLoading(false);
      return;
    }

    if (!passwordRegex.test(resetPassword1)) {
      alert("パスワードは8文字以上16文字以内で、半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります。");
      setIsLoading(false);
      return;
    }
    
    event.preventDefault() // GET /?userId=... を防ぐ

  const response = await fetch("/api/request/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resetUserId,
      resetPassword1,
      resetPassword2,
      email,
    }),
  });

  const resetResult = await response.json();

  if (resetResult.result) {
    alert("パスワード変更が完了しました。ログインしてください。");
  } else {
    alert(resetResult.reason);
  }
  }



return (
  <main className="login-page">
    <div className="login-layout">

      <div className="login-card">
        <div className="login-header">
          <h1>NEWS</h1>
          <p>News Analysis System</p>
        </div>

        <h2>ログイン</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">ユーザID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              minLength={8}
              maxLength={16}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              maxLength={16}
              required
            />
          </div>

          {reason && (
            <p className="login-error" role="alert">
              {reason}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? '認証中...' : 'ログイン'}
          </button>
        </form>

        <button
          type="button"
          className="register-link"
          onClick={() => { setShowRegister(!showRegister); setShowResetPassword(false); }}
        >
          {showRegister ? 'ユーザ登録を閉じる' : 'ユーザ登録はこちら'}
        </button>

        <button
          type="button"
          className="register-link"
          onClick={() => { setShowResetPassword(!showResetPassword); setShowRegister(false); }}
        >
          {showResetPassword ? 'パスワードリセットを閉じる' : 'パスワードリセットはこちら'}
        </button>


      </div>

      {showRegister && (
        <>
          <div className="login-divider" />

          <div className="register-card">
            <h2>ユーザ登録</h2>
            <form className="login-form" onSubmit={handleRegist}>
              <div className="form-group">
                <label htmlFor="registUserId">
                  ユーザID
                </label>
                <input
                  type="text"
                  id="registUserId"
                  onChange={(event) => setRegistUserId(event.target.value)}
                  minLength={8}
                  maxLength={16}
                  pattern="[!-~]{8,16}$"
                  title="ユーザIDは半角英数字と記号のみ使用可能です。8文字以上16文字以内で入力してください。"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="registPassword">
                  パスワード
                </label>
                <input
                  type="password"
                  id="registPassword"
                  onChange={(event) => setRegistPassword(event.target.value)}
                  minLength={8}
                  maxLength={16}
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$"
                  title="パスワードは半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります。8文字以上16文字以内で入力してください。"
                  required
                />
              </div>

              <button
                type="submit"
                className="login-button"
              >
                ユーザ登録
              </button>
            </form>
          </div>
        </>
      )}

      {showResetPassword && (
        <>
          <div className="login-divider" />

          <div className="register-card">
            <h2>パスワード変更</h2>
            <form className="login-form" onSubmit={handleReset}>
              <div className="form-group">
                <label htmlFor="resetUserId">
                  ユーザID
                </label>
                <input
                  type="text"
                  id="resetUserId"
                  onChange={(event) => setResetUserId(event.target.value)}
                  minLength={8}
                  maxLength={16}
                  pattern="[!-~]{8,16}$"
                  title="ユーザIDは半角英数字と記号のみ使用可能です。8文字以上16文字以内で入力してください。"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="resetPassword">
                  新しいパスワード
                </label>
                <input
                  type="password"
                  id="resetPassword1"
                  onChange={(event) => setResetPassword1(event.target.value)}
                  minLength={8}
                  maxLength={16}
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$"
                  title="パスワードは半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります。8文字以上16文字以内で入力してください。"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="registPassword">
                  新しいパスワード(確認用)
                </label>
                <input
                  type="password"
                  id="registPassword2"
                  onChange={(event) => setResetPassword2(event.target.value)}
                  minLength={8}
                  maxLength={16}
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[!-~]{8,16}$"
                  title="パスワードは半角英大文字・半角英小文字・半角数字・半角記号をそれぞれ1種類以上含む必要があります。8文字以上16文字以内で入力してください。"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@mail.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="login-button"
              >
                パスワード更新
              </button>
            </form>
          </div>
        </>
      )}

    </div>
  </main>
)
}

export default Login