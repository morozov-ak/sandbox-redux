import React, {  useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useHttp } from '../hooks/http.hook'
// import { AuthContext } from '../context/AuthContext'
// import { Loader } from '../components/Loader'
import  NoteCard  from '../components/NoteCard'
import {useDispatch} from 'react-redux'
import { connect } from 'react-redux'
import { findUsers,getEditingNote,cleanEditingNote } from '../redux/actions'

const DetailPage = ({token,allUserList,note,loading}) => {
  //const { token } = useContext(AuthContext)
  //const { request/*, loading*/ } = useHttp()
  //const [note, setNote] = useState(null)
  //const [allUserList, setAllUserList] = useState(null)
  const noteId = useParams().id
  const dispatch = useDispatch()


  // const getNote = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/api/note/${noteId}`, 'GET', null, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     console.log(fetched)
  //     setNote(fetched)
  //   } catch (e) { }
  // }, [])


  useEffect(() => {
    //getNote()
    //dispatch(getEditingNote({token, noteId}))
    dispatch(findUsers(token))
    return function cleanup() {dispatch(cleanEditingNote())  }
  }, [token,dispatch,noteId])

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <>
      {/* {!loading && note && <NoteCard note={note} allUserList={allUserList} token={token} />} */}
      {<NoteCard/>}
    </>
  )
}
const mapStateToProps = state => {
  return { token: state.auth.token, allUserList: state.notes.users, note:state.notes.note,loading:state.app.loading }
}

export default connect(mapStateToProps, null)(DetailPage)
