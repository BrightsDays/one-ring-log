import { Link } from "react-router-dom"
import supabase from "../supabase/supabaseClient"
import { useDispatch } from "react-redux"
import { Button } from "./ui/Button"

interface Props {
  title?: string
  user?: string | null
}

export const Header = ({ title, user }: Props) => {
  const dispatch = useDispatch()

  const signOut = () => {
    supabase.auth.signOut()
    dispatch({ type: 'CLEAR_USER'})
  }

  return (
    <header className="flex justify-between border-solid pb-3 items-center">
      <h1 className='font-[MiddleEarth] text-xl sm:text-3xl'>{ title ? title : 'One Ring Logger' }</h1>
      { user ?
        <div className="flex gap-2 items-center">
          <span className="hidden sm:block">{ user }</span>
          <Button text="log out" size="small" buttonEvent={() => signOut()} />
        </div> :
        <Link to='/one-ring-log/'>
          <Button text="To sign in page" size="small" />
        </Link>
      }
    </header>
  )
}