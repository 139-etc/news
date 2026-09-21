function FakeNewsView() {

  const items = [
    {
      id: 1,
      title: "サンプルニュースタイトル",
      text: "ニュース本文のタイトルです。"
    },
    {
      id: 2,
      title: "AIが作成した架空ニュース",
      text: "保存したニュースをもとに生成された架空ニュースのサンプルです。"
    }
  ]

  return (
    <div className="fake-page">

      <div className="fake-header">
        <h1>架空ニュース表示</h1>
        <p>保存した架空ニュースを閲覧できます。</p>
      </div>

      <div className="fake-list">

        {items.map((item) => (
          <article
            key={item.id}
            className="fake-card"
          >

            <h2>{item.title}</h2>

            <p>{item.text}</p>

          </article>
        ))}

      </div>

    </div>
  )
}

export default FakeNewsView