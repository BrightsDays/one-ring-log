import './App.css'
import { Auth } from './components/auth/Authentication'
import { Company } from './components/journey/Company'
import { Log } from './components/journey/Log'
import { Ponies } from './components/journey/Ponies'

function App() {
  return (
    <div>
      <Auth />
      <div className='flex gap-5'>
        <Log />
        <Company />
        <Ponies />
      </div>
    </div>
  )
}

export default App
