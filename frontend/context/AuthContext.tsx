'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ログイン状態を全画面で共有する
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ログイン成功後に認証状態を更新する
  const login = async () => {
    setIsLoggedIn(true);
  };

  // ログアウト時は未ログイン状態に戻す
const logout = async () => {

  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } finally {
    setIsLoggedIn(false);
    setIsLoading(false);
  }
};

  // アプリ起動時にもCookieを確認する（F5対策）
  // レンダーのたびに確認
  useEffect(() => {
    // Spring Bootへ認証状態を問い合わせる
    const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include", // Cookieを自動送信する
      });

      setIsLoggedIn(response.ok);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

    checkAuth();
  },[]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthProviderの中でuseAuthを使ってください");
  }

  return context;
}
