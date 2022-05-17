import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Home from './components/Home';
import Landing from './components/Landing';
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${props => props.bgc};
    color: ${props => props.cl};
    transition: all .5s linear;
`
const Loader = styled.div`
    width: 100%;
    height: 100vh;
    img{
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
`

function App() {
  const [bg, setBg] = useState(false)

  const switchBg = () =>{
    setBg(!bg)
  }

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },5000)
  },[])

  useEffect(()=>{
    const getbg = JSON.parse(localStorage.getItem('background'))

    if(getbg){
      setBg(getbg)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('background', JSON.stringify(bg))
  },[bg])

  return (
    <Container bgc={bg ? '#333' : '#fff'} cl={bg ? '#fff' : '#000'} className="App">
      {
          loading ? (<Loader>
            <img src="/spinner.gif" alt=''></img>
          </Loader>):(
          <Router>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/home' element={<Home bg={bg} switchBg={switchBg}/>}/>
            </Routes>
          </Router>
          )
      }
      <Toaster/>      
    </Container>
  );
}

export default App;
