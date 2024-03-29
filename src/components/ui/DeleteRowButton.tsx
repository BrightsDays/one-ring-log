import trash from '../../assets/delete.png'

interface Props {
  show: boolean
  buttonEvent: () => void
}

export const DeleteRowButton = ({ show, buttonEvent }: Props) => {
  return (
    <>
      {show ?
        <button className="block w-5 bg-transparent p-0 border-0 hover:opacity-80 active:scale-90 transition ease-in-out duration-200 focus:outline-none" onClick={() => buttonEvent()}>
          <img className="h-5" src={trash} alt="trash" />
        </button> : 
        <button className="block bg-transparent p-0 border-0 opacity-30 cursor-auto">
          <img className="h-5" src={trash} alt="trash" />
        </button>
      }
    </>
  )
}