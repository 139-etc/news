"use client"

import { useState } from "react"

function Survey() {

  const [comment, setComment] = useState("")

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault()

    console.log(comment)

    // 後でSpring Bootへ送信
    setComment("")
  }

  return (

    <div className="survey-page">

      <div className="survey-header">
        <h1>アンケート</h1>
        <p>システムへのご意見・ご要望をお聞かせください。</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="survey-card"
      >

        <div className="survey-title">

          <h2>ご意見・ご要望</h2>

          <span>
            お気軽にお書きください
          </span>

        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="例：検索機能をもっと使いやすくしてほしい"
          className="survey-textarea"
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          送信
        </button>

      </form>

    </div>

  )
}

export default Survey