import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState = {
    patientList: localStorage.getItem('patientList') ? JSON.parse(localStorage.getItem('patientList')) : [],
    totalPatient : localStorage.getItem('totalpatient') ? JSON.parse(localStorage.getItem('totalpatient')) :0,
    signedInPatient: localStorage.getItem('signedInPatient')? JSON.parse(localStorage.getItem('signedInPatient')) : 0,
    signedOutPatient: localStorage.getItem('signedOutPatient') ? JSON.parse(localStorage.getItem('signedOutPatient')) : 0,
    ICU: localStorage.getItem('icu') ? JSON.parse(localStorage.getItem('icu')) : 0,
    Stable: localStorage.getItem('stable') ? JSON.parse(localStorage.getItem('stable')) : 0,
    filterStatus : 'all',
}


export const PatientSlice = createSlice({
    name : 'Patient',
    initialState,
    reducers : {
        addPatient : (state,action) => {
            state.patientList.push(action.payload)

            toast.success(`${action.payload.name} Has been Admitted`)

            localStorage.setItem('patientList', JSON.stringify(state.patientList))

            const totalPatient = state.patientList.length

            state.totalPatient = totalPatient

            localStorage.setItem('totalpatient', JSON.stringify(state.totalPatient))

            state.signedInPatient = state.totalPatient - state.signedOutPatient

            localStorage.setItem('signedInPatient', JSON.stringify(state.signedInPatient))

            state.ICU = state.patientList.filter((item) => {
                if(item.condition === 'ICU'){
                    return item
                }else{
                    return null
                }
            }).length
            localStorage.setItem('icu', JSON.stringify(state.ICU))

            state.Stable = state.patientList.filter((item) => {
                if(item.condition === 'stable'){
                    return item
                }else{
                    return null
                }
            }).length
            localStorage.setItem('stable', JSON.stringify(state.Stable))

        },
        addDischarge : (state,action) => {
            const patientList = localStorage.getItem('patientList')
            if(patientList){
               const patientListArr = JSON.parse(patientList)

               patientListArr.forEach((pt,index) => {
                   if(pt.id === action.payload.id){
                       pt.status = action.payload.status
                       pt.timeOut = action.payload.timeOut
                   }
               })

               localStorage.setItem('patientList', JSON.stringify(patientListArr))
               state.patientList = patientListArr

               const Analytics = patientListArr.filter((item)=>{
                   if(item.status === 'discharged'){
                       return item
                   }else{
                       return null
                   }
               })

               state.signedOutPatient = Analytics.length

               localStorage.setItem('signedOutPatient', JSON.stringify(state.signedOutPatient))

               state.signedInPatient = state.totalPatient - state.signedOutPatient

               localStorage.setItem('signedInPatient', JSON.stringify(state.signedInPatient))
            }
        },
        addDelete : (state,action) => {
            const newPatientList = state.patientList.filter((item)=> item.id !== action.payload.id)
            state.patientList = newPatientList

            localStorage.setItem('patientList', JSON.stringify(state.patientList))

            const totalPatient = state.patientList.length

            state.totalPatient = totalPatient

            localStorage.setItem('totalpatient', JSON.stringify(state.totalPatient))

            const Analytics = newPatientList.filter((item)=>{
                if(item.status === 'discharged'){
                    return item
                }else{
                    return null
                }
            })

            state.signedOutPatient = Analytics.length

            localStorage.setItem('signedOutPatient', JSON.stringify(state.signedOutPatient))

            state.signedInPatient = state.totalPatient - state.signedOutPatient

            localStorage.setItem('signedInPatient', JSON.stringify(state.signedInPatient))

            state.ICU = state.patientList.filter((item) => {
                if(item.condition === 'ICU'){
                    return item
                }else{
                    return null
                }
            }).length
            localStorage.setItem('icu', JSON.stringify(state.ICU))

            state.Stable = state.patientList.filter((item) => {
                if(item.condition === 'stable'){
                    return item
                }else{
                    return null
                }
            }).length
            localStorage.setItem('stable', JSON.stringify(state.Stable))
        },
        addFilterPatient : (state,action) =>{
            state.filterStatus = action.payload
        }
    }
})


export const {addPatient,addDischarge,addDelete,addFilterPatient} = PatientSlice.actions

export default PatientSlice.reducer