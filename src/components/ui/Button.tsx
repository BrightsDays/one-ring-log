import React from "react"

interface Props {
  text: string
  size?: 'small' | 'regular'
  buttonEvent?: () => void
}

export const Button = ({text, size, buttonEvent}: Props) => {
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
        border-solid text-orange-700 border-orange-700 bg-transparent hover:bg-orange-200 hover:border-orange-700 font-[MiddleEarth] uppercase`
      }
      onClick={event => clickHandler(event)}
    >
      {text}
    </button>
  )
}