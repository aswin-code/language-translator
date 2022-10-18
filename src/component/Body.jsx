import React, { useEffect, useState } from 'react'
import Textcard from './Textcard'
import axios from 'axios'
const Body = () => {
    const [word, setWord] = useState('')
    const [translate, setTranslate] = useState('')
    const hanldeTyping = (value) => {
        setWord(value)
    }
    const hanldeSubmit = () => {
        console.log("running axios", word)
        axios.post('http://127.0.0.1:3001/api/detect', { word }).then(({ data }) => {
            console.log(data)
            axios.post('http://127.0.0.1:3001/api/translate', { languagecode: data.language, translate: word }).then(({ data }) => {
                setTranslate(data.translate)
            })
        })
    }

    return (
        <div>
            <h3>Type Here</h3>
            <Textcard hanldeTyping={hanldeTyping} value={word} />
            <h3>Translating</h3>
            <Textcard disable="disabled" value={translate} />
            <button className='btn' onClick={hanldeSubmit}> translate</button>
        </div>
    )
}

export default Body