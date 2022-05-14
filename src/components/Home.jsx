import React, { useState } from 'react'
import styled from 'styled-components'
import AppHeader from './AppHeader'
import Search from './Search'
import TableComponent from './TableComponent'
import { useTransition, animated } from 'react-spring'
import { useSelector } from 'react-redux'
import Analytics from './Analytics'

const Hom = styled.div`
    width: 100%;
    min-height: 100vh;

    .firstAnimate{
    @media (max-width:480px) {
      display: block;
    }
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    background-color: #010214bf;
  }
  .animate{
    @media (max-width:480px) {
      display: block;
    }
    width: 80%;
    padding: 2%;
    box-shadow: 2px 2px 4px #010214a6;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    background:#00bd9c;
    overflow-y:auto;
  }
  .bg{
    background: blue;
  }
`
const Card = styled.div`
    width: 20%;
    height: 10vh;
    border-radius: 5px;
    padding: 1%;
    background-color: #fff;
    color: #000;
    font-size: 1.2vw;
    margin-top: 2%;
    display:flex;
    justify-content: center;
    align-items: center;
`
function Home({bg,switchBg}) {

  const showAnalyticTotalGuest = useSelector((state) => state.Patient.totalPatient)
  const showAnalyticSignedInGuest = useSelector((state) => state.Patient.signedInPatient)
  const showAnalyticSignedOutGuest = useSelector((state) => state.Patient.signedOutPatient)
  const showICU = useSelector((state) => state.Patient.ICU)
  const showStable = useSelector((state) => state.Patient.Stable)
    
  const [searchVal, setSearchVal] = useState('')
  const [showMenu, setShowMenu]= useState(false)

  const maskTransitions = useTransition(showMenu, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: showMenu,
    delay: 200,
    // config: config.molasses,
    // onRest: () => set(!show),
})

const menuTransitions = useTransition(showMenu, {
  from: { opacity: 0, transform: "translateX(110%)"},
  enter: { opacity: 1, transform: "translateX(100%)" },
  leave: { opacity: 0, transform: "translateX(110%)" },
  reverse: showMenu,
  delay: 200,
    // config: config.molasses,
  // onRest: () => set(!show),
})

  return (
    <Hom>
        <AppHeader bg={bg}  switchBg={switchBg}/>
        <Search bg={bg} searchVal={searchVal} setSearchVal={setSearchVal}/>
        <Analytics  showMenu={showMenu} setShowMenu={setShowMenu}/>
        <TableComponent bg={bg} searchVal={searchVal}/>
        {
        maskTransitions(
        (styles, item) => item && <animated.div style={styles} className='firstAnimate' onClick={()=> setShowMenu(false)}>

        </animated.div>
        )
      }

      {
        menuTransitions(
        (styles, item) => item && <animated.div style={styles} className='animate'>
         <Card><p>Total Patients : <b>{showAnalyticTotalGuest}</b></p> </Card> 
         <Card><p>Admitted : <b>{showAnalyticSignedInGuest}</b></p> </Card> 
         <Card><p>Discharge : <b>{showAnalyticSignedOutGuest}</b></p> </Card> 
         <Card><p>ICU patient : <b>{showICU}</b></p> </Card> 
         <Card><p>Stable patient : <b>{showStable}</b></p> </Card> 
        </animated.div>
        )
      }
    </Hom>
  )
}

export default Home