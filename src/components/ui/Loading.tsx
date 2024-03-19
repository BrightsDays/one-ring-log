import vector from '../../assets/loading.svg'

export const Loading = () => {
  return (
    <div className='flex justify-center items-center w-svw h-svh'>
      <img
        className='block w-80 animate-[spin_5s_linear_infinite]'
        src={vector}
        alt="loading..."
      />
    </div>
  )
}