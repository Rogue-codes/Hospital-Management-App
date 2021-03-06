import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Tr from './Tr'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const Tab = styled.div`
    @media (max-width:480px) {
      overflow: scroll
    }
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    position: relative;
        th{
          @media (max-width:480px) {
            font-size: .7rem;
          }
            height: 8vh;
            font-family: 'PT Serif', serif;
            background:#00bd9c;
            color: #fff;
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
        .null{
            width: 100%;
            text-align: center;
            position: absolute;
            font-family: 'PT Serif', serif;
            top: 250%;
            font-size: 2vw;
            color: #00bd9c;
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
      <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button"
      table="table-to-xls"
      filename="tablexls"
      sheet="tablexls"
      buttonText="Download as XLS"/>
        <Table id="table-to-xls">
            <thead>
                <tr>
                <th>Name</th>
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
                ):(<p className='null'>Patient log is currently empty <b>Click the admit patient</b> button to admit a new patient</p>)
              }
            </tbody>
        </Table>
    </Tab>
  )
}

export default TableComponent