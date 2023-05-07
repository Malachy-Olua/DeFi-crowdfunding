import React,{  useContext } from 'react';
import styled from "styled-components";

import { CampaignContext } from '../context/CampaignContext';
import Button  from '../components/Button'


const Campaigns = () => {


    const {organisedCampaigns} = useContext (CampaignContext);
    
    
  return (
    <Section>
        <div className='cont1'>
            {organisedCampaigns.map((campaign)=>{
                return(
                    <>
                    <div className='cont2' key={campaign.id}>
                        <div className='cont3'> 
                            <img src={campaign.url} alt='funding' style={{height:200, width:"100%",padding:10}}></img>
                        </div>
                        <div className='cont4'>
                            <div className='title'>
                            <p><span style={{fontSize:20,fontWeight:700}}>Title:</span> {campaign.title}</p>
                            </div>
                            <div className='description'>
                                <p><span style={{fontSize:20,fontWeight:700}}>Description:  </span> 
                                {campaign.description}
                               </p>    
                            </div>
                            <div className='last'>
                                <Button address={campaign.creator_address} Id={campaign.Id} raising_funds={campaign.raising_funds} active={campaign.active}/>
                                <div className="target">
        
                                    <div>
                                        <h3>Target: {campaign.target} | </h3>
                                    </div>
                                    <div>
                                    <h3>Funds Raised: {campaign.funds_raised}</h3> 
                                    </div>
        
                                </div>
                                <div className="container">
                                    <div className="skill html" style={{width:`${campaign.percentage+"%"}`}}>{campaign.percentage+"%"}</div>
                                </div>
                            </div>
                        </div>
                    </div><br/>
                    </>
                )
            })}
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

    .cont3{
        width:500px;
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
    // .html {
    //     width: ;
    // }

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
        transition: ease-in-out all 0.1s;
        transform: scale(1);
    }
      
    .btn:hover {
        transform: scale(1.02);
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
    .donate:hover {
        transform: scale(1.02);
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