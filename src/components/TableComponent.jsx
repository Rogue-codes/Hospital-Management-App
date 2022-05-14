import React from 'react'
import styled from 'styled-components'
// import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import Tr from './Tr'

const Tab = styled.div`
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    position: relative;
        th{
            height: 8vh;
            font-family: 'PT Serif', serif;
            background:#00bd9c;
        }
        td{
            height: 10vh;
            padding-left: 1%;
            text-align: center;
            font-family: 'PT Serif', serif;
        }
        tr{
            text-align: center;
            border-bottom: 1px solid #ddd;
            &:nth-child(even) {
                background-color: ${props => props.bgc} ;
            }
          }
`
function TableComponent({bg,searchVal}) {
  const patient = useSelector((state)=> state.Patient.patientList)

  const filterPat = useSelector((state)=> state.Patient.filterStatus)

 const sortedPatient = [...patient]
  // sort according to time, (earliest first)
  sortedPatient.sort((a,b) => new Date(b.timeIn) - new Date(a.timeIn)) 

  const filterPatList = sortedPatient.filter((item) =>{
    if(filterPat === 'all'){
      return true
    }else if(filterPat === 'ICU'){
      return item.condition === filterPat
    }
    return item.status === filterPat
  })


  return (
    <Tab>
        <Table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Age</th>
                <th>Gender</th>
                <th>HMO</th>
                <th>Time In</th>
                <th>Status</th>
                <th>Time Out</th>
                <th>Condition</th>
                <th>Discharge</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
              {
                filterPatList && filterPatList.length > 0 ?
                (
                  filterPatList.filter( (val) => {
                    if(searchVal === ''){
                        return val
                    }else if(val.name.toLowerCase().includes(searchVal.toLowerCase())){
                        return val
                    }return null
                }).map((P)=>
                    <Tr bg={bg} key={P.id} P={P}/>
                  )
                ):('No patient *Click the admit patient* button to add a new patient')
              }
            </tbody>
        </Table>
    </Tab>
  )
}

export default TableComponent