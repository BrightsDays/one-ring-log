import { AuthPage } from "./components/AuthPage"
import { useSelector, useDispatch } from 'react-redux'
import supabase from "./supabaseClient"
import { useEffect } from "react"
import { PersonalArea } from "./components/PersonalArea"
import { IRootState } from "./reducers"
import { Header } from "./components/Header"

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
    <div className="flex flex-col">
      <Header user={user.name} />
      <div className="flex justify-center gap-5">
        <div className="flex min-w-[320px] flex-col">
          <span>
            This app is a One Ring app
          </span>
          <p>
            Some info about app will be here.<br/>
            And image.<br/>
            And links.
          </p>
        </div>
        <div className="min-w-[320px]">
          { !user.name ? <AuthPage /> : <PersonalArea /> }
        </div>
      </div>
    </div>
  )
}

export default App
