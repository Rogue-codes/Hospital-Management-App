import React from 'react'
import styled from 'styled-components'

const Ser = styled.input`
    width: 40%;
    height: 8vh;
    background: transparent;
    margin-bottom: 5%;
    margin-left: 2%;
    border-radius:5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding-left: 1%;
    border: none;
    color:${props => props.bdc};
    &:focus{
        outline:none;
    }
`
function Search({bg,searchVal, setSearchVal}) {
  return (
    <Ser bdc={ bg ? 'white' : 'black'} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} placeholder="search by name..."/>
  )
}

export default Search