function FakeNewsView(){

    const items = [{id : 1, title : '123456790', text : 'ABCDE'}]

    return (
        <>
            <h1>フェイクニュース表示</h1>
            <ul style={{border :"1px",padding : "5px",textAlign : "left"}}>
                {items.map((item) => (
                    <div key={item.id}>
                    {item.title}<br />{item.text}</div>
                ))}
            </ul>
        </>
    )
}

export default FakeNewsView