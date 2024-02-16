import trash from '../../assets/delete.png'

interface Props {
  show: boolean
  buttonEvent: () => void
}

export const DeleteRowButton = ({ show, buttonEvent }: Props) => {
  return (
    <>
      {show ?
        <button className="block bg-transparent p-0 border-0" onClick={() => buttonEvent()}>
          <img className="h-5" src={trash} alt="trash" />
        </button> : 
        <button className="block bg-transparent p-0 border-0 opacity-30 cursor-auto">
          <img className="h-5" src={trash} alt="trash" />
        </button>
      }
    </>
  )
}