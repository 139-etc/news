"use client"

import { useState } from "react"

function FakeNewsCreate() {

  const items = [
    {
      id: 1,
      title: "サンプルニュースタイトル",
      text: "ニュース本文のサンプルです。"
    }
  ]

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null)

  const submitFakeNews = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
  }

  return (

    <div className="fake-create-page">

      <div className="fake-create-header">
        <h1>架空ニュース生成</h1>
        <p>保存したニュースをもとに架空ニュースを生成します。</p>
      </div>

      <form
        onSubmit={submitFakeNews}
        className="fake-create-layout"
      >

        {/* 左：元ニュース */}

        <div className="search-card-left">

          <h2>元ニュース</h2>

          <div className="result-list">

            {items.map((item) => (

              <div
                key={item.id}
                className={`result-card ${
                  selectedIndex === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedIndex(item.id)}
              >

                <div className="result-header">

                  <input
                    type="radio"
                    name="news"
                    checked={selectedIndex === item.id}
                    readOnly
                  />

                  <span>{item.title}</span>

                </div>

                <p>{item.text}</p>

              </div>

            ))}

          </div>

          <button
            type="submit"
            name="create"
            className="primary-button"
          >
            生成
          </button>

        </div>

        {/* 右：生成結果 */}

        <div className="search-card-right">

          <div className="card-header">

            <h2>生成結果</h2>

            <button
              type="submit"
              name="save"
              className="secondary-button"
            >
              保存
            </button>

          </div>

          <textarea
            rows={20}
            readOnly
            name="summary"
            className="summary-area"
          />

        </div>

      </form>

    </div>

  )
}

export default FakeNewsCreate