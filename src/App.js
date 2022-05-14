import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Toaster } from 'react-hot-toast';


import Home from './components/Home';
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${props => props.bgc};
    color: ${props => props.cl} !important;
    transition: all .5s linear;
`

function App() {
  const [bg, setBg] = useState(false)

  const switchBg = () =>{
    setBg(!bg)
  }

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
      <Toaster/>
      <Home bg={bg} switchBg={switchBg}/>
    </Container>
  );
}

export default App;
