"use client"

import { useState, useEffect } from "react"

function NewsSearch() {

  type Category = {
    id: string;
    content: string;
  }

  type Period = {
    id: string;
    content: string;
  }

  type SearchResponse = {
    categoryList: Category[];
    periodList: Period[];
  }

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch("/api/response/search");
      const data: SearchResponse = await response.json();

      setCategoryList(data.categoryList);
      setPeriodList(data.periodList);
    };

    fetchCodes();
  },[]);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [periodList, setPeriodList] = useState<Period[]>([])

  const [category, setCategory] = useState('');
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
              <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">選択してください</option>
                {categoryList.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.content}
                  </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>期間</label>
              <select name="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="">選択してください</option>
                {periodList.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.content}
                  </option>
                  ))}
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

            <h3>タイトル</h3>
            <textarea
              rows={2}
              readOnly
              name="summary"
              className="summary-area-title"
            />

            <h3>本文</h3>
            <textarea
              rows={20}
              readOnly
              name="summary"
              className="summary-area-text"
            />

          </div>

        </div>

      </form>

    </div>

  )

}

export default NewsSearch