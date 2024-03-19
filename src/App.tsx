import { AuthPage } from "./components/AuthPage"
import { useSelector, useDispatch } from 'react-redux'
import supabase from "./supabase/supabaseClient"
import { useEffect } from "react"
import { PersonalArea } from "./components/PersonalArea"
import { RootState } from "./store/reducers"
import ring from './assets/ring.png'
import { PageLayout } from "./components/PageLayout"
import { Header } from "./components/Header"

const selectUser = (state: RootState) => state.user

export const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email
      const id = session?.user.id
      
      if (email) dispatch({ type: 'GET_USER', payload: { email, id } })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // TODO: minimize ring images
  return (
    <PageLayout>
      { user.name && <Header user={user.name} /> }
      <div className="flex justify-center gap-3 flex-col sm:flex-row sm:gap-10 border-y-2 border-y-orange-700">
        <div className="flex sm:max-w-[320px] flex-col gap-3 pt-3 pb-3 items-center">
          <div className="flex gap-1">
            <img className="max-w-[90px] block sm:hidden" src={ring} alt="ring" />
            <span>
              One Ring Logger is a web application that helps Loremasters run games 
              and helps players save character data.
            </span>
          </div>
          <img className="max-w-[320px] hidden sm:block" src={ring} alt="ring" />
          <span className="text-center sm:text-left">
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
    </PageLayout>
  )
}

export default App
