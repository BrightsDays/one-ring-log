import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "../supabaseClient"

const customTheme = {
  default: {
    colors: {
      brand: 'rgb(194, 65, 12)',
      brandAccent: 'rgb(194, 65, 12)',
      brandButtonText: 'rgb(194, 65, 12)',
      defaultButtonBackground: 'white',
      defaultButtonBackgroundHover: '#eaeaea',
      defaultButtonBorder: 'rgb(194, 65, 12)',
      defaultButtonText: 'gray',
      dividerBackground: '#eaeaea',
      inputBackground: 'transparent',
      inputBorder: 'lightgray',
      inputBorderHover: 'gray',
      inputBorderFocus: 'gray',
      inputText: 'black',
      inputLabelText: 'gray',
      inputPlaceholder: 'darkgray',
      messageText: 'gray',
      messageTextDanger: 'red',
      anchorTextColor: 'gray',
      anchorTextHoverColor: 'darkgray',
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
      labelBottomMargin: '8px',
      anchorBottomMargin: '4px',
      emailInputSpacing: '4px',
      socialAuthSpacing: '4px',
      buttonPadding: '10px 15px',
      inputPadding: '10px 15px',
    },
    radii: {
      borderRadiusButton: '4px',
      buttonBorderRadius: '4px',
      inputBorderRadius: '4px',
    },
  }
}


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
          providers={[]}
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
      </div>
    </div>
  )
}