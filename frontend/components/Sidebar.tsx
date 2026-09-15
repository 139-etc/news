import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import { useAuth } from '../context/AuthContext'

function Sidebar() {

  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    if(confirm("ログアウトしますか？")){
      localStorage.removeItem("token")
      await logout()
      router.push("/")
    }
  }

  return (
    <nav>
      <h3>NEWS</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link href="/home">ホーム</Link></li>
        <li><Link href="/search">ニュース検索</Link></li>
        <li><Link href="/fake_create">架空ニュース生成</Link></li>
        <li><Link href="/fake_view">架空ニュース表示</Link></li>
        <li><Link href="/survey">アンケート</Link></li>
        <button onClick={ handleLogout }>ログアウト</button>
      </ul>
    </nav>
  )
}

export default Sidebar