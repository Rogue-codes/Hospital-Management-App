import React from 'react'
import styled from 'styled-components'

const Ser = styled.input`
    @media (max-width:480px) {
      width: 90%;
      height: 6vh;
      margin-top: 30%;
      margin-bottom: 20%;
    }
    width: 40%;
    height: 8vh;
    background: transparent;
    margin-bottom: 5%;
    margin-left: 2%;
    border-radius:5px;
    padding-left: 1%;
    border: 2px solid white;
    color:white;
    &:focus{
        outline:none;
    }
    &::placeholder{
        color:white;
    }
`
function Search({searchVal, setSearchVal}) {
  return (
    <Ser value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} placeholder="search by name..."/>
  )
}

export default Search