import { Link } from "react-router-dom"
import supabase from "../../supabaseClient"
import { useDispatch } from "react-redux"

interface Props {
  title?: string
  user?: string | null
}

export const Header = ({ title, user }: Props) => {
  const dispatch = useDispatch()

  const signOut = () => {
    supabase.auth.signOut()
    dispatch({ type: 'clear'})
  }

  return (
    <header className="flex justify-between border-solid border-b-2 border-y-orange-700 p-3">
      <h1 className='font-[MiddleEarth]'>{ title }</h1>
      { user ?
        <div>
          <span>{ user }</span>
          <button onClick={() => signOut()}>Log out</button>
        </div> :
        <Link to='/'>To sign in page</Link>
      }
    </header>
  )
}