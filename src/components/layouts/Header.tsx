import { Link, useLocation } from "react-router-dom"
import supabase from "../../supabase/supabaseClient"
import { useDispatch } from "react-redux"
import { Button } from "../ui/Button"

interface Props {
  title?: string
  user?: string | null
}

export const Header = ({ title, user }: Props) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const signOut = () => {
    supabase.auth.signOut()
    dispatch({ type: 'CLEAR_USER'})
  }

  return (
    <header className="flex justify-between border-solid pb-3 items-center">
      <h1
        className='font-[MiddleEarth] text-xl sm:text-3xl'
        test-data-id='title'
      >
        { title ? title : 'One Ring Logger' }
      </h1>
      { user ?
        <div className="flex gap-2 items-center">
        {location.pathname === '/one-ring-log/' ?
          <span
            className="hidden sm:block"
            test-data-id='user-email'
          >{ user }</span> :
          <Link
            to='/one-ring-log/'
            test-data-id='go-to-main'
          >
            <span
              className="hidden sm:block"
              test-data-id='user-email'
            >{ user }</span>
          </Link>
        }
          <Button text="log out" size="small" buttonEvent={() => signOut()} />
        </div> :
        <Link to='/one-ring-log/'>
          <Button text="To sign in page" size="small" />
        </Link>
      }
    </header>
  )
}