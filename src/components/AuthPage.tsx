import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "../supabase/supabaseClient"

export const AuthPage = () => {
  return (
    <>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'github', 'facebook']}
        appearance={{ theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'rgb(194, 65, 12)',
              brandAccent: 'rgb(254 215 170)',
              brandButtonText: 'rgb(194, 65, 12)',
            },
          }
        } }}
      />
    </>
  )
}