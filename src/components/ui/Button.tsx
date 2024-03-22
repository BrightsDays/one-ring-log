import React from "react"

interface Props {
  text: string
  size?: 'small' | 'regular'
  disabled?: boolean
  buttonEvent?: () => void
}

export const Button = ({text, size, disabled, buttonEvent}: Props) => {
  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (buttonEvent) {
      event.preventDefault()
      buttonEvent()
    }
  } 

  return (
    <button
      className={
        `${size === 'small' ? 'p-1 text-sm border-1 ' : 'border-2 ' } 
        ${disabled ? 'opacity-30' : 'hover:opacity-80'}
        border-solid text-orange-700 border-orange-700 bg-transparent hover:border-orange-700 font-[MiddleEarth] uppercase active:scale-90 transition ease-in-out duration-200 focus:outline-none`
      }
      disabled={disabled}
      onClick={event => clickHandler(event)}
    >
      {text}
    </button>
  )
}