import { ReactNode } from "react"

interface Props {
  title?: string
  children: ReactNode
}

export const Card = ({ title, children }: Props) => {
  return (
    <section
      className="flex flex-col gap-2 sm:gap-5 sm:p-5 py-3 border-solid border-b-2 sm:border-b-0 sm:border-x-2 border-orange-700"
    >
      {title && <h2 className="font-[MiddleEarth] sm:text-3xl text-2xl text-center lowercase">{title}</h2>}
      {children}
    </section>
  )
}