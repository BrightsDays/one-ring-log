import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "../../supabaseClient"

export const AuthPage = () => {
  return (
    <div className="flex justify-center gap-5">
      <div className="flex min-w-[320px] flex-col">
        <span>
          This app is a One Ring app
        </span>
      </div>
      <div className="min-w-[320px]">
        <Auth
          supabaseClient={supabase}
          providers={['google', 'github']}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </div>
  )
}