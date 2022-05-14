import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addDelete, addDischarge } from './features/patientSlice'
import {AiFillDelete} from 'react-icons/ai'
import toast from 'react-hot-toast'

const Trow = styled.tr`
    &:nth-child(even) {
        background-color: ${props => props.bgc} ;
    }
    .underline{
        text-decoration:line-through;
        color:red;
    }
    button{
        padding: 2% 5%;
        border-radius: 5px;
        border: none;
        color: #fff;
        background: #00bd9c;
        transition: all .5s linear;
        &:hover{
            background:#21f9d5;
            transform: scale(1.01)
        }
    }
`
const Btn = styled.button`
    background: #00bd9c;
`
function Tr({bg,P}) {
    const [discharge, setDischarge] = useState(true)
    const dispatch = useDispatch()

    // initialize discharge functionality
    const handleDischarge = () => {
        setDischarge(true)
        if(discharge) {
            dispatch(addDischarge({
                ...P,
                status: discharge ? 'discharged' : 'admitted',
                timeOut: discharge ? new Date().toLocaleString() : ''
            }))
        }toast.success(`${P.name} has been Discharged`, {
            position: 'bottom-left'
        })
    }

    // initialize delete functionality
    const handleDelete = () => {
        dispatch(addDelete(
            P
        ))
        
        toast.error(`${P.name} has been deleted`, {
            position: 'bottom-left'
        })
    }
  return (
    <Trow bgc={bg ? 'black' : 'lightgrey'}>
        <td  className={P.status === 'discharged'? 'underline' : null}>{P.name}</td>
        <td className={P.status === 'discharged'? 'underline' : null}>{P.number}</td>
        <td>{P.age}</td>
        <td>{P.gender}</td>
        <td className={P.status === 'discharged'? 'underline' : null}>{P.hmo}</td>
        <td><b>{P.timeIn}</b></td>
        <td>{P.status}</td>
        <td><b>{P.timeOut}</b></td>
        <td>{P.condition}</td>
        <td><Btn onClick={handleDischarge}>Discharge</Btn></td>
        <td><AiFillDelete onClick={handleDelete} size='1.5rem' color='red' cursor='pointer'/></td>
    </Trow>
  )
}

export default Tr