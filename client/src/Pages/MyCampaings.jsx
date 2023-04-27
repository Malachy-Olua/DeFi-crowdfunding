import React, { useState, useEffect } from "react";
import styled from "styled-components";
import community2 from "../images/community2.jpg";
import { Input, Popover, Radio, Modal, message } from "antd";
import {AiOutlineDelete} from  "react-icons/ai";

const Campaigns = () => {

  const settings = (
    <Section>
      <div style={{color:"#ff0066"}}>Delete Campaign</div><br/>
      <div>
          <button className="donate">Delete</button>
      </div>
        
      
    </Section>
);

  return (
    <Section>
        <div className='cont1'>
            <div className='cont2'>
                <div className='cont3'> 
                    <img src={community2} style={{height:200, width:300}}></img>
                </div>
                <div className='cont4'>
                    <div className='title'>
                      <p><span style={{fontSize:20,fontWeight:700}}>Title:</span>  A Campaign</p>
                      <div className="delete">
                        <Popover 
                              content={settings}
                              title="" 
                              trigger="click" 
                              placement="topLeft"
                          >
                          <AiOutlineDelete/>
                        </Popover>
                        
                      </div>
                    </div>
                    <div className='description'>
                        <p><span style={{fontSize:20,fontWeight:700}}>Description:  </span> 
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Harum praesentium dolorum ea beatae id officia iste architecto 
                        quasi autem! Illum vero distinctio delectus! Provident exercitationem 
                        tenetur consequuntur, laboriosam illo repellat...</p>    
                    </div>
                    <div className='last'>
                         <div>
                            <button className="btn">Completed</button>
                          </div>
                        <div className="target">
                          <div>
                            <h3>Target: 30,300 | </h3>
                          </div>
                          <div>
                            <h3>Funds Raised: 5600</h3> 
                          </div>
                        </div>
                        <div class="container">
                          <div class="skill html">80%</div>
                        </div>
                    </div>
                </div>
            </div><br/>
        </div>
    </Section>
  )
}

export default Campaigns

const Section = styled.section`

  .cont2{
      display: flex;
      flex-direction: row;
      height:auto;
      border: 3px solid;
      // padding:10px;
      margin-left: 15px;
      margin-right: 15px;
      border-radius: 10px;
      
  }
  .title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    svg{
      color: #ff0066;
      padding-right: 15px;
      font-size:20px;
      cursor:pointer;
    }
  }

  .donate{
    background-color: red;
    border-radius: 5px;
    border: none;
    color: white;
    padding: 3px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    cursor: pointer;
  }

  .donate:hover {
    transform: scale(1.02);
  }
  .delete:hover {
    transform: scale(1.1);
  }

  .btn{
    cursor:pointer;
    transition: ease-in-out all 0.1s;
    transform: scale(1);
  }
  
  .btn:hover {
    transform: scale(1.02);
  }

  .container {
      background-color: rgb(192, 192, 192);
      width: 300px;
      margin-bottom:10px;
      margin-right:10px;
      border-radius: 15px;
  }

  .skill {
      background-color: rgb(116, 194, 92);
      color: white;
      padding: 1%;
      text-align: right;
      font-size: 20px;
      border-radius: 15px;
  }
  .html {
      width: 80%;
  }

  .percent{
      height: 30px;
      width: 200px;
      margin-bottom:10px;
      margin-right:10px;
      border-style: 2px solid black;
      background-color:red;
      border-radius:20px;
      
  }
  .percentage{
      height: 100%;
      background-color:green;
      width:25%;
      border-radius:20px;
  }
  .cont4{
      display: flex;
      flex-direction: column;
      margin-left:20px;
      border-left: 2px solid;
      width:100%;
      .title{
          padding-left:15px;
          padding-top:0px;
      }
      .description{
          padding-left:15px;
          margin-top:-15px;
      }
  }

  .last{
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: flex-end;
      button{
          margin-left:10px;
          margin-bottom:10px;
          background-color: #1a75ff;
          border: none;
          border-radius: 5px;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
      }
  }
  .btn{
      cursor:pointer;
  }
  .disabled {
      opacity: 0.6;
      cursor: not-allowed;
  }
  .target{
      display: flex;
      flex-direction: row;
      gap: 0.7em;
      padding-right: 0.5em;
  }
`