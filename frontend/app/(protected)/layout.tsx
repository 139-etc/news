"use client";
import Sidebar from "../../components/Sidebar";
import "../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // AuthContextで共有しているログイン状態を取得する
  const { isLoading,isLoggedIn } = useAuth();

  const router = useRouter();

  // 未ログインならログイン画面へ戻す
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  // 認証が完了するまで保護画面を表示しない
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="center">
        {children}
      </div>
    </div>
  );
}

export default RootLayout;