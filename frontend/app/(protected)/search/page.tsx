"use client"
import { useState } from "react"
function NewsSearch(){

    const [ selectedIndex, setSelectedIndex ] = useState<number | null>(null)

    const submitNewsSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const data = {
            category: formData.get("category"),
            period: formData.get("period"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endData"),
        };

        alert(data)
    }

    const items = [{id : 1, title : '123456790', text : 'ABCDE'}]

    return (
        <>
            <h1>ニュース検索</h1>

            <form onSubmit={submitNewsSearch}>
            <table>
                <tbody>
                <tr><td>カテゴリ</td><td><select name="category"></select></td></tr>
                <tr><td>期間</td><td><select name="priod"></select></td></tr>
                <tr><td>開始日</td><td><input type="date" name="startDate"/></td></tr>
                <tr><td>終了日</td><td><input type="date" name="EndDate"/></td></tr>
                </tbody>
            </table>

            <button type="submit" name="search">検索開始</button>
            <br />
            <br />
            <ul>
                {items.map((item) => (
                    <div key={item.id} onClick={() => setSelectedIndex(item.id)} style={{cursor : 'pointer'}}>
                        <input type="checkbox" value={item.id} />{item.title}
                    <br />{selectedIndex === item.id && <p>{item.text}</p>}</div>
                ))}
            </ul>
            <br />
            <button type="submit" name="summary">要約開始</button>
            <br />
            <br />
            <textarea rows={10} cols={50} readOnly name="summary"></textarea>            
            <br />
            <button type="submit" name="keep">上記保存</button>
            </form>
        </>
    )
}

export default NewsSearch