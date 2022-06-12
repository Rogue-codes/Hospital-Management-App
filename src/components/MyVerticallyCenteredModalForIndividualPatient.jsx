import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Pop = styled.div`
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 30;
    gap: 2%;
`

function MyVerticallyCenteredModalForIndividualPatient(props) {
    return (
        <Modal
          {...props}
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <h1 className='pd'>PATIENT DETAILS</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Pop action="">
                <p>Patient Name: <b>{props.P.name}</b> </p>
                <p>Patient Number: <b>{props.P.number}</b> </p>
                <p>Patient Age: <b>{props.P.age} yrs old</b> </p>
                <p>Patient Gender: <b>{props.P.gender}</b> </p>
                <p>Patient Address: <b>{props.P.address}</b> </p>
                <p>Patient HMO: <b>{props.P.hmo}</b> </p>
                <p>Patient Duration: <b>{props.P.timeOut - props.P.timeIn }</b> </p>
                <p>Patient Status: <b>{props.P.status}</b> </p>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Done</Button>
                </Modal.Footer>
              </Pop>
          </Modal.Body>
        </Modal>
      );
}

export default MyVerticallyCenteredModalForIndividualPatient