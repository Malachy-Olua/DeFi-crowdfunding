import React,{ useState, useEffect, useCallback, useContext } from 'react';
import styled from "styled-components";
import helping_hands from "../images/helping_hands.jpg";
import funding from "../images/funding.jpg";
import community2 from "../images/community2.jpg";
import crowd from "../images/crowd.jpg";
import withdrawal from "../images/withdrawal.jpg";
import { VotingContext } from '../context/VotersContext';
import Navbar from "./Navbar"
import { useNavigate } from 'react-router-dom';

// const useAuth=()=>{
//   const user = localStorage.getItem('account');
//   if(user){
//     return true
//   }else{
//     return false
//   }
// }


const Home = () => {

  const {connectWallet,currentAccount} = useContext (VotingContext);
  const [wallet, setWallet] = useState(false)
  const navigate = useNavigate();
  // const auth = useAuth();


  return (
    <>
      <Section>
        <Navbar/>
        <div className='section2'>
          <div className='div1'>
            {/* <h1><span style={{color:"#1a75ff", fontFamily:"",fontSize:50}}>Bring Your Ideas to Life</span></h1> */}
            {/* <p><span style={{color:"#ff0066",fontSize:40,fontFamily:""}}> Crowdfund Your Next Project</span></p> */}
            {/* <p style={{marginTop:-20}}><span style={{color:"#ff0066",fontSize:40,fontFamily:""}}>Easily and Effectively</span></p> */}
          </div>
        </div>
        <div className='section3'>
          <div className='serv'>
            <div>
              <button className='btn' onClick={()=>{navigate("/CreateCampaign")}}>Create Campaign</button>
            </div>
          </div>
          
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
    height:400px;
    justify-content: center;
    text-align:center;
  }

  .serv{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-top:-250px;
    h3{
      font-size: 30px;
    }
  }

  .section3b{
    display:flex;
    flex-direction: row;
    justify-content: center;
    gap:100px;
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
 



  // @media screen and (min-width: 280px) and (max-width: 1080px) {
  //   background-size: cover;
  //   background-position: center;
  //   height: 100vh;
  //   width:100vw;
  //   .navbar{
  //     padding-left:1.875rem;
  //     padding-right:1.875rem;
  //     padding-top:3rem;
  //     padding-bottom:4rem;
  //     display:flex;
  //     justify-content:space-between;
  //   }
  //   .text h1 {
  //     font-size: 40px;
  //   } 
  //   .text p{
  //     color:orange;
  //     font-size:20px;
  //     font-weight: bold;
  //   }
  //   .text h4{
  //     color:orange;
  //     font-size:20px;
  //     font-weight: bold;
  //   }
  //   .text button {
  //     background: linear-gradient(to right, #014d01, #04f704);
  //     color: white;
  //     border: none;
  //     font-size: 20px;
  //     padding: 10px 20px;
  //     margin-top: 2rem;
  //     border-radius: 15px;
  //     width: 9rem;
  //     font-weight: bold;
  //     display: inline-block;
  //     cursor: pointer;
  //     transition: 0.4 ease;
  //     box-shadow: 0 5px 8px 0 rgba(26, 25, 25, 0.2);
  //   }
  // }
 
`