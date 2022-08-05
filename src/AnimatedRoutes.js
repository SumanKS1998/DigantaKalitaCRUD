import React from 'react'
import Pok from './components/Pok'
import Gallery from './components/Gallery'
import Home from './components/Home'
import Suggestions from './components/Suggestions'
import { Route, Routes, useLocation } from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import ScrollToTop from './ScrollToTop'
import Admin from './components/Admin'
import SingleBlog from './SingleBlog'
import Family from './components/Family'
import Videos from './components/subcomponents/Videos'
const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <ScrollToTop/>
        <Routes location={location} key={location.pathname}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/media/gallery' element={<Gallery />} />
            <Route exact path='/media/family' element={<Family />} />
            <Route exact path='/media/videos' element={<Videos />} />
            <Route exact path='/events' element={<Pok />} />
            <Route exact path='/events/:id' element={<SingleBlog />} />
            <Route exact path='/suggestions' element={<Suggestions />} />
            <Route exact path='/adminLogin' element={<Admin />} />
        </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes