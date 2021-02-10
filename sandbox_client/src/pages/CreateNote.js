import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreateNote = () => {
    const { loading, request } = useHttp()
    const { message2 } = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const [newNote, setnewNote] = useState({
        name: '', notetext: ''
    })
    useEffect(() => {
        async function chek_auth() {
            try {
                await request('/api/note/notes', 'GET', null, {
                    authorization: `Bearer ${auth.token}`
                })
            }
            catch (e) { }
        }
        chek_auth()


    }, [auth.token, request])


    const changeHandler = event => {
        setnewNote({ ...newNote, [event.target.name]: event.target.value })

    }

    const createHandler = async () => {
        try {
            await request('/api/note/create', 'POST', { ...newNote }, {
                authorization: `Bearer ${auth.token}`
            })
            message2(`Создана новая заметка: ${newNote.name} `, newNote)
            setnewNote({ name: '', notetext: '' })

        }
        catch (e) { }
    }
    
    if (loading) {
        let btn = document.getElementById('button-save')
        btn.className = "btn btn-danger"
        btn.disabled = 'false'

    }
    if (!loading) {
        if (document.getElementById('button-save')) {
            let btn = document.getElementById('button-save')
            btn.className = "btn btn-success"
            btn.removeAttribute("disabled")
        }
    }


    return (

        <div>
            <h1>Создать заметку</h1>
            <div className="input-group mb-3">
                <input onChange={changeHandler} value={newNote.name} name="name" id="name" type="text" placeholder="Заголовок заметки" className="form-control" aria-label="Amount (to the nearest dollar)" />
                <div className="input-group-append">
                    <button onClick={createHandler} className="btn btn-success" type="button" id="button-save">Сохранить</button>
                </div>
            </div>
            <div className="input-group">
                <textarea onChange={changeHandler} value={newNote.notetext} name="notetext" id="notetext" className="form-control" aria-label="With textarea"></textarea>
            </div>
            
        </div>


    )
}