import trash from '../../assets/delete.png'

interface Props {
  show: boolean
  buttonEvent: () => void
}

export const DeleteRowButton = ({ show, buttonEvent }: Props) => {
  const clickHandler = () => {
    buttonEvent()
  }

  return (
    <button
      className="block w-5 bg-transparent p-0 border-0 hover:opacity-80 active:scale-90 transition ease-in-out duration-200 focus:outline-none disabled:opacity-30"
      test-data-id="delete-icon"
      disabled={!show}
      onClick={clickHandler}
    >
      <img className="h-5" src={trash} alt="trash" />
    </button>
  )
}