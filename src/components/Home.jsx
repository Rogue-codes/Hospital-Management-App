import React, { useState } from 'react'
import styled from 'styled-components'
import AppHeader from './AppHeader'
import Search from './Search'
import TableComponent from './TableComponent'
import { useTransition, animated } from 'react-spring'
import { useSelector } from 'react-redux'
import Analytics from './Analytics'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      width: 75%;
    }
    width: 100%;
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
    @media (max-width:480px) {
      font-size: 1rem;
      width: 60%;
      margin-left:5%;
      margin-bottom: 10%;
    }
    width: 30%;
    height: 10vh;
    border-radius: 5px;
    background-color: #fff;
    color: #000;
    font-size: 1.2vw;
    margin-top: 2%;
    display:flex;
    justify-content: center;
    align-items: center;
`
const Card3 = styled.div`
    @media (max-width:480px) {
      font-size: 1rem;
      width: 60%;
    }
    margin-top: 4%;
    width: 20%;
    margin-left: 5%;
`
const Top = styled.div`
    width: 100%;
    background: linear-gradient(90deg, #0000008b 42%, rgba(2,1,18,0.6871790952709209) 77%, rgba(1,12,14,0.5051062661392682) 100%),url('https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    background-size: cover;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-position: 10% 50%;
`
function Home({bg,switchBg}) {

  const showAnalyticTotalGuest = useSelector((state) => state.Patient.totalPatient)
  const showAnalyticSignedInGuest = useSelector((state) => state.Patient.signedInPatient)
  const showAnalyticSignedOutGuest = useSelector((state) => state.Patient.signedOutPatient)
  const showICU = useSelector((state) => state.Patient.ICU)
  const showStable = useSelector((state) => state.Patient.Stable)

  const data = {
    labels: ['Admmited', 'discharged'],
    datasets: [
      {
        label: '# of patients',
        data: [showAnalyticSignedInGuest,showAnalyticSignedOutGuest],
        backgroundColor: [
          'tomato',
          'orange'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
    
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
  from: { opacity: 0, transform: "translateX(100%)"},
  enter: { opacity: 1, transform: "translateX(65%)" },
  leave: { opacity: 0, transform: "translateX(100%)" },
  reverse: showMenu,
  delay: 200,
    // config: config.molasses,
  // onRest: () => set(!show),
})

  return (
    <>
    <Hom>
      <Top>
        <AppHeader bg={bg}  switchBg={switchBg}/>
        <Search bg={bg} searchVal={searchVal} setSearchVal={setSearchVal}/>
        <Analytics  showMenu={showMenu} setShowMenu={setShowMenu}/>
      </Top>
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
         <Card><p>Discharged : <b>{showAnalyticSignedOutGuest}</b></p> </Card> 
         <Card><p>Patient in ICU : <b>{showICU}</b></p> </Card> 
         <Card><p>Stable Patient : <b>{showStable}</b></p> </Card> 
         <Card3><Pie data={data}  /></Card3>
        </animated.div>
        )
      }
    </Hom>
    </>
  )
}

export default Home