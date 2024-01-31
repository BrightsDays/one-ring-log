import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Template = ({ children }: Props) => {
  return (
    <div className="w-screen">
      { children }
    </div>
  )
}