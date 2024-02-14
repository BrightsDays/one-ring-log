import { AuthPage } from "./components/AuthPage"
import { useSelector, useDispatch } from 'react-redux'
import supabase from "./supabaseClient"
import { useEffect } from "react"
import { PersonalArea } from "./components/PersonalArea"
import { IRootState } from "./reducers"

const selectUser = (state: IRootState) => state.user

export const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email
      const id = session?.user.id
      
      if (email) dispatch({ type: 'get', payload: { email, id } })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      { !user.name ? <AuthPage /> : <PersonalArea /> }
    </div>
  )
}

export default App
