import React from 'react'
import styled from 'styled-components'
import {IoAnalyticsSharp} from 'react-icons/io5'

const Btn = styled.button`
    height: 8vh;
    width: 10%;
    position: absolute;
    top: 18%;
    right: 2%;
    background: ${props => props.bgc};
    border: none;
    font-size: 1.3vw;
    color: #fff;
    border-radius: 5px;
`
function Analytics({showMenu,setShowMenu,bg}) {
  return (
    <Btn bgc={bg ? 'blue' : '#00bd9c'} onClick={()=>setShowMenu(!showMenu)}>Analytics <span><IoAnalyticsSharp size="2rem"/></span></Btn>
  )
}

export default Analytics