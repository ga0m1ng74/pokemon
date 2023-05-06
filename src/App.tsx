import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'

function App() {
  return (
    <div className="min-h-screen bg-slate-800 text-white p-2">
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:name' element={<Detail/>}/>
      </Routes>        
    </div>
  )
}

export default App
