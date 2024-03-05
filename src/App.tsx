import { AuthPage } from "./components/AuthPage"
import { useSelector, useDispatch } from 'react-redux'
import supabase from "./supabaseClient"
import { useEffect } from "react"
import { PersonalArea } from "./components/PersonalArea"
import { IRootState } from "./reducers"
import { Header } from "./components/Header"
import ring from './assets/ring.png'

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
    <div className="flex flex-col p-3">
      { user.name && <Header user={user.name} /> }
      <div className="flex justify-center gap-3 flex-col sm:flex-row sm:gap-10">
        <div className="flex sm:max-w-[320px] flex-col">
          <span className="mt-3 text-center sm:text-left">
            One Ring Logger is a web application that helps Loremasters run games 
            and helps players save character data.
          </span>
          <img className="max-w-[320px] mt-3 m-auto" src={ring} alt="ring" />
          <span className="mt-3 text-center sm:text-left">
            Game released by <a href="https://freeleaguepublishing.com" target="_blank">Free League Publishing</a>
            <br />
            Official game page: <a href="https://freeleaguepublishing.com/games/the-one-ring/" target="_blank">The One Ring</a><br />
            Application by <a href="https://brightsdays.github.io" target="_blank">brightsdays</a>
          </span>
        </div>
        <div className="min-w-[320px]">
          { !user.name ? <AuthPage /> : <PersonalArea /> }
        </div>
      </div>
    </div>
  )
}

export default App
