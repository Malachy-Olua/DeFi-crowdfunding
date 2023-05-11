import React,{ useState, useEffect, useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';
import styled from "styled-components";
import { ethers } from 'ethers';
import { crowdFunding, crowdFundingABI } from "../utils/Constants";
import Completed from "../components/Completed"
import Delete from "../components/Delete"

import { useAccount } from 'wagmi'

const { ethereum } = window;

const getCampaignContract = () =>{

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const CrowdFundingContract = new ethers.Contract(crowdFunding, crowdFundingABI, signer);

  return CrowdFundingContract;

  // console.log({
  //     provider,
  //     signer,
  //     CrowdFundingContract
  // });
}



const MyCampaigns = () => {

  const [ Istruth, setIstruth] = useState(true)
  const {getMyCampaigns,withdraw} = useContext (CampaignContext);
  const { address} = useAccount()
  const[MyCampaigns,setMyCampaigns]=useState([]);
 
  const getMy = async(address)=>{
    if(!ethereum) return alert('Please install a wallet first');
    const campaignContract = getCampaignContract();

    const campaign = await campaignContract.getMyCampaigns(address);
    //console.log(campaign);
    const filteredCampaigns = campaign.filter(campaign => parseInt(campaign.id._hex) != 0)
    //console.log(filteredCampaigns);
    const organisedCampaigns = filteredCampaigns.map((campaign)=>({
       
      title:campaign.title,
      description:campaign.description,
      creator_address: campaign.creator_address,
      Id: parseInt(campaign.id._hex),
      url: campaign.url,
      target: parseInt(campaign.target._hex)/(10**18),
      funds_raised: parseInt(campaign.funds_raised._hex)/(10**18) ,
      active:campaign.active,
      raising_funds:campaign.raising_funds,
      isDeleted:campaign.isDeleted,
      percentage: (((parseInt(campaign.funds_raised._hex)/(10**18))/(parseInt(campaign.target._hex)/(10**18)))*100)
    }));
    setMyCampaigns(organisedCampaigns);
    //console.log(organisedCampaigns);
  }
 



  const handleClick = (event,address,Id) =>{
    
    event.preventDefault();

    withdraw(address,Id);  

  }

  useEffect(()=>{
    //getMy(address)
    if(Istruth){
      getMy(address)
      setIstruth(false)
      
    }
  },[address])

  //https://github.com/Malachy-Olua/crowdfunding.git
  return (
    <Section>
        {MyCampaigns.length>=1?(<div className='cont1'>
          {MyCampaigns.map((campaign)=>{
            
           
            return (
              <>
                <div className='cont2'>
                  <div className='cont3'> 
                    <img src={campaign.url} style={{height:200, width:"100%",padding:10}}></img>
                  </div>
                  <div className='cont4'>
                    <div className='title'>
                      <p><span style={{fontSize:20,fontWeight:700}}>Title:</span> {campaign.title}</p>
                      <div className="delete">
                        <Delete address={campaign.creator_address} Id={campaign.Id}/>
                      </div>
                    </div>
                    <div className='description'>
                        <p><span style={{fontSize:20,fontWeight:700}}>Description:  </span> 
                        {campaign.description}
                        </p>    
                    </div>
                    <div className='last'>
                      <Completed address={campaign.creator_address} Id={campaign.Id} active={campaign.active}/>
                      <button className={`${campaign.raising_funds?"disabled":'btn'}`} onClick={event =>handleClick(event,campaign.creator_address,campaign.Id)}>Withdraw</button>
                      <div className="target">
                        <div>
                          <h3>Target: {campaign.target} | </h3>
                        </div>
                        <div>
                          <h3>Funds Raised: {campaign.funds_raised}</h3> 
                        </div>
                      </div>
                      <div class="container">
                        <div className="skill html" style={{width:`${campaign.percentage+"%"}`}}>{campaign.percentage+"%"}</div>
                      </div>
                    </div>
                  </div>
                </div><br/>
              </>
            )
          })}
        </div>):(
          <div className='warning'>
            <div style={{opacity:0.7}}>You have not created any campaign</div>
            <div style={{opacity:0.7}}>OR</div>
            <div style={{opacity:0.7}}>Check if wallet is connected.</div>
          </div>
        )}
       
    </Section>
  )
}

export default MyCampaigns

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
        padding: 10px 20px;
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

  input[type=text], select, textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type=Number] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=file] {
    width: 100%;
    padding: 8px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .form {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 300px;
    height:250px;
    margin-bottom:20px;
  }

  .btnpop{
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btnpop:hover {
    background-color: #45a049;
  }

  .disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .warning{
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height: 450px;
    font-size:40px;
    background: ;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .warning{
      display:flex;
      flex-direction: column;
      justify-content:center;
      align-items:center;
      height: 500px;
      font-size:20px;
      padding:10px;
      background: ;
    }
  }
`