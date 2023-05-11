import React from 'react';
import styled from "styled-components";
import funding from "../images/funding.jpg";
import community2 from "../images/community2.jpg";
import crowd from "../images/crowd.jpg";
import withdrawal from "../images/withdrawal.jpg";
import Navbar from "./Navbar"
import { useNavigate } from 'react-router-dom';

import { useAccount } from 'wagmi'


const Home = () => {

  const { address} = useAccount()
  const navigate = useNavigate();
  


  return (
    <>
      <Section>
        <Navbar/>
        <div className='section2'>
          <div className='div1'>
          </div>
        </div>
        <div className='section3'>
          <div className='serv'>
            <div>
              {address?
                (<button className='btn' onClick={()=>{navigate("/CreateCampaign")}}>Create Campaign</button>):
                (<button className='btn' onClick={()=>{navigate("/")}}>Connect Wallet to Create Campaign</button>)  
              }
            </div>
          </div>
        </div>
        <div>
          <div className='section3b'>
            <div className='section3bi'>
              <div style={{textAlign:"center", marginTop:10}}>
                <img src={funding} alt="logo" style={{height:100, width:100}}></img>
              </div>
              <div style={{textAlign:"center",color:"#001a33",fontWeight:200}}>
                <h5>Join the Funding Revolution</h5>
                <div style={{height:2,width:200,backgroundColor:"#001a33",marginLeft:20, marginTop:-10}}></div>
              </div>
            </div>
            <div className='section3bii'>
              <div style={{textAlign:"center", marginTop:10}}>
                <img src={community2} alt="logo" style={{height:100, width:100}}></img>
              </div>
              <div style={{textAlign:"center",color:"#001a33",fontWeight:200}}>
                <h5>Crowdfunding Made Easy</h5>
                <div style={{height:2,width:200,backgroundColor:"#001a33",marginLeft:20, marginTop:-10}}></div>
              </div>
            </div>
            <div className='section3biii'>
              <div style={{textAlign:"center", marginTop:10}}>
                <img src={withdrawal} alt="logo" style={{height:100, width:120}}></img>
              </div>
              <div style={{textAlign:"center",color:"#001a33",fontWeight:200}}>
                <h5>Empower Your Creativity</h5>
                <div style={{height:2,width:200,backgroundColor:"#001a33",marginLeft:20, marginTop:-10}}></div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Home;

const Section = styled.section`

 
  height: 100vh;
  background-position: center;
  transition: 0.4 ease;
  .section2{
    display: flex;
    flex-direction: column;
    text-align:center;
    background-image: url(${crowd});
    height: 400px;
    background-size: cover;
    background-position: center;
    //height: 100vh;
    background-position: center;
    transition: 0.4 ease;
  }

  .div1{
    margin-top:130px;
  }

  .btn{
    cursor:pointer;
    transition: ease-in-out all 0.1s;
    transform: scale(1);
    background-color: #47d147;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  
  .btn:hover {
    transform: scale(1.02);
  }

  .section3{
    display:flex;
    flex-direction: column;
    height:100px;
    justify-content: center;
    text-align:center;
  }

  .serv{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-top:0px;
    h3{
      font-size: 30px;
    }
  }

  .section3b{
    display:flex;
    flex-direction: row;
    justify-content: center;
    gap:100px;
    height:400px;
  }

  .section3bi{
    display:flex;
    flex-direction: column;
    transition: transform .2s;
    height:200px;
    width:250px;
    border-style: solid solid black;
    //background:red;
    margin-bottom:-200px;
    margin-top:50px;
    border-style:outset;
  }

  .section3bi:hover {
    -ms-transform: scale(1.2); /* IE 9 */
    -webkit-transform: scale(1.2); /* Safari 3-8 */
    transform: scale(1.2); 
  }

  .section3bii{
    display:flex;
    flex-direction: column;
    transition: transform .2s;
    height:200px;
    width:250px;
    border-style: solid solid black;
    //background:red;
    margin-bottom:-200px;
    margin-top:50px;
    border-style:outset;
  } flex-direction: column;

  .section3bii:hover {
    -ms-transform: scale(1.2); /* IE 9 */
    -webkit-transform: scale(1.2); /* Safari 3-8 */
    transform: scale(1.2); 
  }

  .section3biii{
    display:flex;
    flex-direction: column;
    transition: transform .2s;
    height:200px;
    width:250px;
    border-style: solid solid black;
    //background:red;
    margin-bottom:-200px;
    margin-top:50px;
    border-style:outset;
  }

  .section3biii:hover {
    -ms-transform: scale(1.2); /* IE 9 */
    -webkit-transform: scale(1.2); /* Safari 3-8 */
    transform: scale(1.2); 
  }

  .disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .donate{
    cursor:pointer;
    transition: ease-in-out all 0.1s;
    transform: scale(1); 
    background-color: #00cc66;
    border-radius: 5px;
    border: none;
    color: white;
    padding: 3px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    
  }



  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .section3b{
      display:flex;
      flex-direction: column;
      align-content: space-around;
      gap: 200px;
      align-items: center;
      margin-top:-150px;
      height:100vh;
    }
  }

 
`