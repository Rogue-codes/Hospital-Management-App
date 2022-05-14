import React from 'react'
import styled from 'styled-components'

const Ser = styled.input`
    width: 40%;
    height: 6vh;
    background: transparent;
    margin-bottom: 5%;
    margin-left: 2%;
    border-radius:5px;
    border: 1px solid ${props => props.bdc};
    padding-left: 1%;
    color:${props => props.bdc};
    &:focus{
        outline:none;
    }
`
function Search({bg,searchVal, setSearchVal}) {
  return (
    <Ser bdc={ bg ? 'white' : 'lightgrey'} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} placeholder="search by name..."/>
  )
}

export default Search