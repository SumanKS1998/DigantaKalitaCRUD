import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import AnimatedRoutes from './AnimatedRoutes'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { auth } from './firebase-config'
import { screenModeContext } from './helper/Context'
function App() {
  const [screenMode, setScreenMode] = useState(false)
  
  return (
    <div className={!screenMode ? "light" : "dark"}>

      <screenModeContext.Provider value={{ screenMode, setScreenMode }}>
        <Navbar />

        <AnimatedRoutes />
        <Footer />
      </screenModeContext.Provider>
    </div>
  )
}

export default App