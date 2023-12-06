import { ReactNode } from "react"

interface Props {
  title?: string
  children: ReactNode
}

export const Card = (props: Props) => {
  return (
    <section className="flex flex-col gap-5 p-5 border-solid border border-sky-500 rounded-lg">
      <h2 className="text-3xl">{props.title}</h2>
      {props.children}
    </section>
  )
}