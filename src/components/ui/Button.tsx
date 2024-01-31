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
      onClick={event => clickHandler(event)}
    >{text}</button>
  )
}