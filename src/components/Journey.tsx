import { TextInput } from "./ui/TextInput"

export const Journey = () => {
  return (
    <section className="flex flex-col gap-5 p-10 border-solid border border-sky-500 rounded-lg">
      <h2 className="text-3xl">Journey Log</h2>
      <div className="flex flex-col gap-3">
        <TextInput label="Year" />
        <TextInput label="Season"/>
        <TextInput label="Journey from"/>
      </div>
    </section>
  )
}