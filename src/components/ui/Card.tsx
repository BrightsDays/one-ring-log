import { ReactNode } from "react"

interface Props {
  title?: string
  children: ReactNode
}

export const Card = (props: Props) => {
  return (
    <section className="flex flex-col gap-5 p-5 border-solid border-x-2 border-x-orange-700">
      <h2 className="font-[MiddleEarth] text-3xl text-center lowercase">{props.title}</h2>
      {props.children}
    </section>
  )
}