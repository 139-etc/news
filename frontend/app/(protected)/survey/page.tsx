function Survey(){
    return (
        <div>
            <h1>アンケート</h1>
            <h2>ご意見どしどしお書きください</h2>
            <form>
            <textarea  rows={10} cols={50} />
            <br />
            <button type="submit">送信</button>
            </form>
        </div>
    )
}

export default Survey