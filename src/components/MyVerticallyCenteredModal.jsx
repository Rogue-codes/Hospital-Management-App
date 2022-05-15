import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { useState } from 'react'
import { addPatient } from './features/patientSlice'
import { useDispatch } from 'react-redux'
import {v4 as uuid} from 'uuid'
import toast from 'react-hot-toast'

const Pop = styled.form`
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 30;
    gap: 2%;
    input{
        width: 80%;
        height: 10vh;
        margin-top: .4%;
        padding-left: 2%;
        border-radius: 5px;
        border: 1px solid lightgrey;
        &:focus{
            outline: none;
        }
    }
    .sel{
        width: 80%;
        height: 10vh;
        background: white;
        color: grey;
        padding-left: 2%;
        border-radius: 5px;
        border: 1px solid lightgrey;
        &:focus{
            outline: none;
        }
    }
`

function MyVerticallyCenteredModal(props) {
    // getting input values
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [hmo, setHmo] = useState('')
    const [condition, setCondition] = useState('')

    
    
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        // validating that all input fields are valid before submiting to our store.
        if(name !== '' && number !== '' && address !== '' && age !== '' && status !== ''  && gender !== ''  && hmo !== '' && condition !== ''){
            // dispatching our payloads to the store
            dispatch(addPatient({ 
                id: uuid(),
                name, 
                age, 
                address, 
                number, 
                gender,
                status,
                hmo,
                condition,
                timeIn : new Date().toLocaleString(),
                timeOut: status !== 'admitted' ? new Date().toLocaleString() : ''
            }))
        }else{
            toast.error(`All Patient information must be filled in correctly`)
            return
        }


        // reverting our input value into empty strings
        setName('')
        setNumber('')
        setAge('')
        setAddress('')
        setStatus('')
        setGender('')
        setHmo('')
        setCondition('')

        props.onHide();
    }
    return (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Admit a Patient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Pop action=""  onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name"/>
                <input value={age} onChange={(e)=>setAge(e.target.value)} type="number" placeholder="age"/>
                <input value={number} type="number" placeholder="phone number" onChange={(e)=>setNumber(e.target.value)} />
                <input value={address} type="text" onChange={(e)=>setAddress(e.target.value)} placeholder="Address"/>
                <select value={gender} className='sel' onChange={(e)=>setGender(e.target.value)} name="" id="">
                    <option value="">--gender--</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>

                <select value={hmo} className='sel' onChange={(e)=>setHmo(e.target.value)} name="" id="">
                    <option value="">--HMO--</option>
                    <option value="AXA MANSARD">AXA MANSARD</option>
                    <option value="HYGEIA">HYGEIA</option>
                    <option value="LIBERTY BLUE">LIBERTY BLUE</option>
                    <option value="MULTISHIELD">MULTISHIELD</option>
                    <option value="AVON">AVON</option>
                    <option value="REDCARE">REDCARE</option>
                    <option value="NIL">NIL</option>
                </select>

                <select value={condition} className='sel' onChange={(e)=>setCondition(e.target.value)} name="" id="">
                    <option value="">--condition--</option>
                    <option value="stable">Stable</option>
                    <option value="ICU">Unconsious</option>
                </select>

                <select value={status} className='sel' onChange={(e)=>setStatus(e.target.value)} name="" id="">
                    <option value="">--select--</option>
                    <option value="admitted">Admit</option>
                </select>

        <Modal.Footer>
            <Button type='submit' variant="success">Done</Button>
            <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
            </Pop>
        </Modal.Body>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal