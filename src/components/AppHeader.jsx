import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { addFilterPatient } from './features/patientSlice';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';

const Header = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
    margin-bottom: 5%;
    select{
      width: 10%;
      height: 6vh;
      padding-left: 2%;
      border-radius: 5px;
      background: transparent;
      color: #00bd9c;
      &:focus{
          outline: none;
      }
    }
`
const Btn = styled.button`
    width: 10%;
    font-size: 1.3vw;
    height: 8vh;
    background:#00bd9c;
    color: white;
    border: none;
    border-radius: 5px;
    transition: all .5s linear;
    &:hover{
      transform: scale(1.1);
    }
`
const Toggle = styled.div`
    width: 50px;
    height: 25px;
    border-radius: 20px;
    border: 1px solid #000;
    background-color: #fff;
    right: 10px;
    position: absolute;
    left: 94%;
    top: 30%;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn{
    }
`
const Bttn = styled.button`
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: none;
        padding: 2%;
        left: ${props => props.ps}px;
        position: absolute;
        transition: all .5s linear;
        background: #00bd9c;
`

function AppHeader({bg, switchBg}) {
    const [modalShow, setModalShow] = React.useState(false);

    const filterValue = useSelector((state) => state.Patient.filterStatus)

    const [filter, setFilter] = useState(filterValue)

    const dispatch = useDispatch()

    const handleChange = (e) => {
      setFilter(e.target.value)
      dispatch(addFilterPatient(
        e.target.value
      ))
    }
  return (
    <Header>
        <Btn onClick={() => setModalShow(true)}>Admit Patient</Btn>
        <Toggle>
            <img src="sun.png" height='15' width='15' alt="" srcset="" />
            <Bttn ps={ bg ? '25' : '0'} onClick={switchBg}></Bttn>
            <img src="moon.png" height='15' width='15' alt="" srcset="" />
        </Toggle>
        <select name="" id="" value={filter} onChange={handleChange}>
            <option value="all" bdc={ bg ? 'white' : 'lightgrey'}>All</option>
            <option value="admitted">Admitted</option>
            <option value="discharged">Dis-Charged</option>
            <option value="ICU">ICU</option>
        </select>
        <MyVerticallyCenteredModal
        bg={bg}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Header>
  )
}

export default AppHeader