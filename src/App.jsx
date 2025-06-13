import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RegisterPage from './components/RegisterPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import Homepage from './components/HomePage'
import LoginPage from './components/LoginPage'
import Navigation from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/welcome' element={<WelcomePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
