import { Template } from "./components/ui/Template"
import { AuthPage } from "./components/auth/AuthPage"
import { useSelector, useDispatch } from 'react-redux'
import supabase from "./supabaseClient"
import { useEffect } from "react"
import { Button } from "./components/ui/Button"

const selectUser = state => state.user

export const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const signOut = () => {
    supabase.auth.signOut()
    dispatch({ type: 'clear'})
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      const email = session?.user.email
      if (email) dispatch({ type: 'get' })
    })
  })

  return (
    <Template>
      { !user.name && <AuthPage /> }
      { user.name && <div>
        <span>{user.name}</span>
        <Button text='OUT' buttonEvent={() => signOut()} />
      </div>}
    </Template>
  )
}

export default App
