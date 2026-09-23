import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

function Sidebar() {

  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    if (confirm("ログアウトしますか？")) {
      await logout()
      router.push("/")
    }
  }

  return (
    <nav className="sidebar-modern">

      <div className="sidebar-top">
        <h2 className="sidebar-logo">NEWS</h2>
        <p className="sidebar-subtitle">News Analysis</p>
      </div>

      <ul className="sidebar-menu">

        <li>
          <Link href="/home" className="sidebar-link">
            ホーム
          </Link>
        </li>

        <li>
          <Link href="/search" className="sidebar-link">
            ニュース検索
          </Link>
        </li>

        <li>
          <Link href="/fake_create" className="sidebar-link">
            架空ニュース生成
          </Link>
        </li>

        <li>
          <Link href="/fake_view" className="sidebar-link">
            架空ニュース表示
          </Link>
        </li>

        <li>
          <Link href="/survey" className="sidebar-link">
            アンケート
          </Link>
        </li>

      </ul>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        ログアウト
      </button>

    </nav>
  )
}

export default Sidebar