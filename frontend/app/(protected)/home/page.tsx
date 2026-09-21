function Home() {
  return (
    <div className="home-page">

      <div className="home-header">
        <h1>ホーム</h1>
        <p>NEWS Analysis System</p>
      </div>

      <div className="feature-grid">

        <div className="feature-card">
          <h3>ニュース検索</h3>
          <p>カテゴリ・期間指定で検索・要約</p>
        </div>

        <div className="feature-card">
          <h3>架空ニュース生成</h3>
          <p>保存ニュースから架空ニュース生成</p>
        </div>

        <div className="feature-card">
          <h3>架空ニュース表示</h3>
          <p>お気に入りを一覧表示</p>
        </div>

        <div className="feature-card">
          <h3>アンケート</h3>
          <p>意見・改善案を投稿</p>
        </div>

      </div>

    </div>
  )
}

export default Home