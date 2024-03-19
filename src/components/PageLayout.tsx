import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import supabase from "../supabase/supabaseClient"

interface Props {
  children: ReactNode
}

export const PageLayout = ({ children }: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email
      const id = session?.user.id
      
      if (email) dispatch({ type: 'GET_USER', payload: { email, id } })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col p-3">
      { children }
    </div>
  )
}