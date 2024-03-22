import vector from '../../assets/loading.svg'

interface Props {
  fullScreen?: boolean
}

export const Loading = ({ fullScreen }: Props) => {
  return (
    <div className={
      `${fullScreen ? 'h-full w-full' : 'opacity-80 w-full h-full'} flex justify-center items-center absolute bg-[#f9f8f3] z-10`
    }>
      <img
        className={`${fullScreen ? 'w-80' : 'w-full h-full'} block animate-[spin_5s_linear_infinite]`}
        src={vector}
        alt="loading..."
      />
    </div>
  )
}