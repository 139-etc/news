"use client"

import { useState } from "react"

function NewsSearch() {

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [period, setPeriod] = useState('');

  const submitNewsSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      category: formData.get("category"),
      period: formData.get("period"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    }

    console.log(data)
  }

  const items = [
    {
      id: 1,
      title: "サンプルニュースタイトル",
      text: "ニュース本文のサンプルです。"
    }
  ]

  return (

    <div className="search-page">

      <div className="search-header">
        <h1>ニュース検索</h1>
        <p>カテゴリと期間を指定してニュースを検索します。</p>
      </div>

      <form
        onSubmit={submitNewsSearch}
        className="search-layout"
      >

        <div className="search-card search-filter-card">

          <h2>検索条件</h2>

          <div className="search-form">

            <div className="form-group">
              <label>カテゴリ</label>
              <select name="category">
                <option value="00">すべて</option>
                <option value="01">政治</option>
                <option value="02">外交</option>
                <option value="03">紛争</option>
                <option value="04">犯罪</option>
                <option value="05">経済</option>
                <option value="06">金融</option>
                <option value="07">医療</option>
                <option value="08">科学</option>
                <option value="09">テクノロジー</option>
                <option value="10">環境</option>
                <option value="11">エネルギー</option>
                <option value="12">災害</option>
                <option value="13">教育</option>
                <option value="14">社会</option>
                <option value="15">宗教</option>
                <option value="16">労働</option>
                <option value="17">人権</option>
                <option value="18">文化</option>
                <option value="19">スポーツ</option>
              </select>
            </div>

            <div className="form-group">
              <label>期間</label>
              <select name="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="">指定なし</option>
                <option value="1">過去15分</option>
                <option value="2">過去24時間</option>
                <option value="3">過去7日</option>
                <option value="4">過去2週間</option>
                <option value="5">過去3か月</option>
                <option value="99">カスタム</option>
              </select>
            </div>

            {period == "99" && (
            <>
            <div className="form-group" >
              <label>開始日</label>
              <input
                type="date"
                name="startDate"
              />
            </div>

            <div className="form-group">
              <label>終了日</label>
              <input
                type="date"
                name="endDate"
              />
            </div>
            </>
            )}

          </div>

          <button
            type="submit"
            name="search"
            className="primary-button"
          >
            検索開始
          </button>

        </div>

        <div className="search-right">

          {/* 検索結果 */}

          <div className="search-card">

            <div className="card-header">

              <h2>検索結果</h2>

              <button
                type="submit"
                name="summary"
                className="secondary-button"
              >
                要約開始
              </button>

            </div>

            <div className="result-list">

              {items.map((item) => (

                <div
                  key={item.id}
                  className={`result-card ${
                    selectedIndex === item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedIndex(
                      selectedIndex === item.id
                        ? null
                        : item.id
                    )
                  }
                >

                  <div className="result-header">

                    <input
                      type="radio"
                      checked={selectedIndex === item.id}
                      readOnly
                    />

                    <span>{item.title}</span>

                  </div>

                  {selectedIndex === item.id && (
                    <p>{item.text}</p>
                  )}

                </div>

              ))}

            </div>

          </div>

          <div className="search-card">

            <div className="card-header">

              <h2>ニュース要約</h2>

              <button
                type="submit"
                name="keep"
                className="secondary-button"
              >
                上記保存
              </button>

            </div>

            <textarea
              rows={8}
              readOnly
              name="summary"
              className="summary-area"
            />

          </div>

        </div>

      </form>

    </div>

  )

}

export default NewsSearch