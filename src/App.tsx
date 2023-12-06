import './App.css'
import { Company } from './components/journey/Company'
import { Log } from './components/journey/Log'
import { Ponies } from './components/journey/Ponies'
import supabase from './supabaseClient'

console.log(supabase)

function App() {
  return (
    <div className='flex gap-5'>
      <Log />
      <Company />
      <Ponies />
    </div>
  )
}

export default App
