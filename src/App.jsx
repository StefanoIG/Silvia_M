import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/Login'
import Reports from './components/pages/Reports'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'

function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/reports' element={<Reports />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
