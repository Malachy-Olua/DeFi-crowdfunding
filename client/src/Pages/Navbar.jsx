import React,{ useState } from 'react';

import styled from "styled-components";
import investLogo from "../images/investLogo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

import { GiTwirlCenter } from "react-icons/gi";
import { SiBlockchaindotcom } from "react-icons/si";

import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';


function Navbar() {
 
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  const [navbarState, setNavbarState] = useState(false);
  const [currentList, setCurrentList] = useState(1);

  


  return (
    <>
      <Section>
        <nav className="top1">
          <ul className="top2">
            <li className="list1">
              <div>
                <SiBlockchaindotcom/>
              </div> 
              <div>
                <span style={{color:"white"}}>Decentralized </span>
              </div>
            </li>
            <li className="list2">
              <div>
                <SiBlockchaindotcom/>
              </div>
              <div>
                <span style={{color:"white"}}>Powered by Blockchain</span>
              </div>
            </li>
    
            <li className="list3">
              <div>
                <SiBlockchaindotcom/>
              </div>
              <div>
                <span style={{color:"white"}}>Amplify Your Impact</span>
              </div>
            </li>
          </ul>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
              ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
        </nav>

        <nav className="nav2">
          <div className='space'>
            <ul className="container1">
              <li className="ist1">
                <div className='investLogo'>
                  <img src={investLogo} alt="" className='logoimg'/>
                  {/* <h2><span style={{color:"#001a33",fontFamily:"Ysabeau"}}>Inspire-Help</span></h2> */}
                </div> 
                <div className='details'>
                  <ul className='ontainer1'>
                    <li>
                      <Link to="/" style={{textDecoration:"none"}}><h3 style={{color:"#1a75ff"}}>Home</h3></Link>
                    </li>
                    <li>
                      <Link to="/Campaigns" style={{textDecoration:"none"}}><h3 style={{color:"#1a75ff"}}>Campaigns</h3></Link>
                    </li>
                    <li>
                      <Link to="/MyCampaings" style={{textDecoration:"none"}}><h3 style={{color:"#1a75ff"}}>My Campaigns</h3></Link>
                    </li>
                    <li>
                      <Link to="/Donations" style={{textDecoration:"none"}}><h3 style={{color:"#1a75ff"}}>My Donations</h3></Link>
                    </li>
                  </ul>
                </div>
                <div className='balance'>
                  <ConnectButton/>
                  {/* <BiWallet/>
                  <h2><span style={{color:"#001a33"}}>$0.0</span></h2> */}
                </div> 
                
              </li>
            </ul>
          </div>
        </nav>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive_lists">
          <ul>
            <li className={currentList === 1 ? "active" : "none"}>
              <span style={{color:"white"}}>Home</span>
            </li>
        
            <li className={currentList === 2 ? "active" : "none"}>
              <GiTwirlCenter />
              <span style={{color:"white"}}>Voting</span>
            </li>

            <li className={currentList === 3 ? "active" : "none"}>
              <GiTwirlCenter />
              <span style={{color:"white"}}>Create Contestants/Election</span>
            </li>
            <li>
              <GiTwirlCenter />
              <span style={{color:"white"}}>Elections</span>  
            </li>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}

export default Navbar;

const Section = styled.section`

  .top1{
    display: flex;
    // justify-content:space-between;
    background: #001a33;
    text-decoration:none;
    height:30px;
    align-items:center;
    justify-content:center;
    .toggle {
      display: none;
    }   
  }

  .investLogo{
    display:flex;
    flex-direction:row;
    align-items:center;
    width:100px;
  }

  .balance{
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
    svg{
      font-size:50px;
      color:#001a33;
    }
  }

  .nav2{
    display: flex;
    height:80px;
    align-items:center;
    width:100%;
    margin-right:0px;
  }

  .space{
    display:flex;
    // justify-content:space-around;
    // gap:-30px;
    align-items:center;
    gap:0px;
  }

  .container1{
    display:flex;
    list-style-type: none;
    gap: 0rem;
    font-size:12px;
    width:100%;
  }

  .ontainer1{
    display:flex;
    list-style-type: none;
    margin-left:-100px
    width:100px;
    gap: 3rem;
    padding-right:100px;
    font-size:15px;
    text-decoration:none;
  }

  .logoimg{
    width:100px;
    height:75px;
    margin-left:-30px;
  }

  .details{
    display:flex;
    justify-content:center;
    flex-direction:row;
    align-items:center;
    gap:80px;
    margin-left:150px;
  }

  .top2{
    display:flex;
    list-style-type: none;
    gap: 2rem;
    padding-right:100px;
    font-size:12px;
    svg{
      font-size:15px;
      color:yellow;
    }
  }

  .list1{
    display:flex;
    align-items:center;
    gap: 0.5rem;
    font-size:12px;
    svg{
      font-size:15px;
      color:yellow;
    }
  }
  .ist1{
    display:flex;
    align-items:center;
    gap: 10px;
    font-size:12px;
    // justify-content:space-between;
  }

  .list2{
    display:flex;
    align-items:center;
    gap: 0.5rem;
    font-size:12px;
    svg{
      font-size:15px;
      color:yellow;
    }
  }

  .list3{
    display:flex;
    align-items:center;
    gap: 0.5rem;
    font-size:12px;
    svg{
      font-size:15px;
      color:yellow;
    }
  }

  .dropbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
    h3:hover {
      color: red;
    }
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    padding: 15px;
    width: 400px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {background-color: #ddd;}
  
  .dropdown:hover .dropdown-content {display: block;}
  
  .dropdown:hover .dropbtn {background-color: #3e8e41;}

  
  
  @media screen and (min-width: 280px) and (max-width: 1080px) {}


`

const ResponsiveNav = styled.div`
position: fixed;
right: -10vw;
top: 0;
z-index: 15;
background: rgb(58,59,60);
background: linear-gradient(90deg, rgba(58,59,60,1) 11%, rgba(58,59,60,1) 100%);
height: 100vh;
width: ${({ state }) => (state ? "60%" : "0%")};
transition: 0.4s ease-in-out;
display: flex;
flex-direction:column;
color:white;
opacity: 10;
//visibility:hidden;
padding: 1rem;
text-decoration:none;

.show{
  display:flex;
  flex-direction:column;
  color:white;
  z-index:99;
  text-decoration:none;
}  
.responsive_lists {
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3rem;
    padding-left:10px;
    padding-right:10px;
    text-decoration:none;
    li {
      display:flex;
      gap:1rem;
      padding: 0.6rem 0.6rem;
      border-radius: 0.6rem;
      text-decoration:none;
      &:hover {
        background: #45f3ff;
        
        span{
          color:black;
          text-decoration:none;
        }
      }
      span{
        font-size:0.938rem;
        text-decoration:none;
      }
      svg{
        font-size:25px;
      }
      .btn{
        padding: 5px 20px;
        border-radius:5px;
        background:#45f3ff; 
        outline:none;
        border:none;
        cursor:pointer;
      }
    }
    .active {
      background:#45f3ff;
      color: black;
    }
  }
}

`;
