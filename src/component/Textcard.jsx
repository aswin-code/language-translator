import React from 'react'

const Textcard = (props) => {
    const { disable, hanldeTyping, value } = props
    return (
        <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
                {disable ? <input type="text" style={{ margin: 0, padding: 0 }} disabled /> : <input type="text" style={{ margin: 0, padding: 0 }} onChange={(e) => hanldeTyping(e.target.value)} value={value} />}
            </div>
        </div>
    )
}

export default Textcard