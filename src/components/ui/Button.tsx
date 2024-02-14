import React from "react"

interface Props {
  text: string
  buttonEvent: () => void
}

export const Button = ({text, buttonEvent}: Props) => {
  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    buttonEvent()
  } 

  return (
    <button
      className="border-solid border-2 border-orange-700 bg-transparent hover:bg-orange-200 font-[MiddleEarth] uppercase"
      onClick={event => clickHandler(event)}
    >
      {text}
    </button>
  )
}