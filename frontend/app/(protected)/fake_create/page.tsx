"use client"
import { useState } from "react"

function FakeNewsCreate(){

    const items = [{id : 1, title : '123456790', text : 'ABCDE'}]

    const [ selectedIndex, setSelectedIndex ] = useState<number | null>(null)

    return (
        <>
            <h1>フェイクニュース生成</h1>
            <form>
            <ul style={{border :"1px",padding : "5px",textAlign : "left"}}>
                {items.map((item) => (
                    <div key={item.id}><input type="radio" value={item.id} />
                    {item.title}<br />{'　　'}{item.text}</div>
                ))}
            </ul>
            <div style={{display:"flex",alignItems:"center",textAlign:"center",flexDirection:"column"}}>
            <button type="submit" name="create">生成</button>
            <br />
            <textarea rows={10} cols={50} readOnly name="summary"></textarea>            
            <br />
            <button type="submit" name="save">保存</button>
            </div>
            </form>
        </>
    )
}

export default FakeNewsCreate