import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const VidContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    overflow: hidden;
`
const Land = styled.video`
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100vh;
    border: 11px solid #000;
    /* Make video to at least 100% wide and tall */
    min-width: 100%; 
    min-height: 100%; 

    /* Setting width & height to auto prevents the browser from stretching or squishing the video */
    width: auto;
    height: auto;

    /* Center the video */
    position: absolute;
    top: 50%;
    left: 50%;
  transform: translate(-50%,-50%);
`
const Content = styled.div`
    position: fixed;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    #myBtn {
        width: 200px;
        font-size: 18px;
        padding: 16px;
        border: none;
        background: #00bd9c;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all .3s linear;
        &:hover {
            background: #3ffadb;
        }
        h1{
            font-size: 5vw;
        }
        p{
            font-size: 3vw;
        }
    }
`
function Landing() {
  return (
    <VidContainer>
        <Land autoPlay muted loop id="myVideo">
            <source src="bsn.mp4" type="video/mp4"/>
        </Land>

        <Content class="content">
        <h1>HOSPITAL MANAGEMENT SYSTEM</h1>
        <p>Register and Log Patients into your Hospital</p>
        <Link id="myBtn" to="/home">Try Demo</Link>
        </Content>
    </VidContainer>
  )
}

export default Landing