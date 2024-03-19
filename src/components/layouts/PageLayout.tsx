/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import supabase from "../../supabase/supabaseClient"
import { useLocation } from "react-router-dom"

interface Props {
  children: ReactNode
}

export const PageLayout = ({ children }: Props) => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email
      const id = session?.user.id
      
      if (email) dispatch({ type: 'GET_USER', payload: { email, id } })
    })
  }, [])

  useEffect(() => {
    console.log('Location changed');
    dispatch({ type: 'RESET_LOADING' })
  }, [location]);

  return (
    <div className="flex flex-col p-3">
      { children }
    </div>
  )
}