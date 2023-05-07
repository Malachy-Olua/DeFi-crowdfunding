import React,{ useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { CampaignContext } from '../context/CampaignContext';
import { useAccount } from 'wagmi';
import { crowdFunding, crowdFundingABI } from "../utils/Constants";
import { ethers } from 'ethers';


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
  

const Donations = () => {

    const {acceptCompletion,organisedCampaigns} = useContext (CampaignContext);

    const [ Istruth, setIstruth] = useState(true)
    const { address} = useAccount()
    const[MyDonations,setMyDonations]=useState([]);
    

    const getMy = async(address)=>{
        if(!ethereum) return alert('Please install a wallet first');
        const campaignContract = getCampaignContract();
    
        const campaign = await campaignContract.getMyDonations(address);
        //console.log(campaign);
        const filteredCampaigns = campaign.filter(campaign => parseInt(campaign.id._hex) != 0)
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
        setMyDonations(organisedCampaigns);
        console.log(organisedCampaigns);
    }


    if(Istruth){
        getMy(address)
        setIstruth(false)
    }
    

    const handleClick = (event,Id) =>{
    
        event.preventDefault();
    
        acceptCompletion(Id);  
    
    }

    const photoUrl = (_Id)=>{

        const filteredUrlCampaign = organisedCampaigns.filter(campaign=>{
            return(campaign.Id==_Id);
        });
        for(let i=0;i<filteredUrlCampaign.length;i++){
            return(filteredUrlCampaign[i].url)
        }
        //console.log(filteredUrlCampaign)
    }
    
    useEffect(()=>{
        getMy();
    },[])

  return (
    <Section>
        <div className='cont1'>
            {MyDonations.map((campaign)=>{
                return (
                    <>
                        <div className='cont2' key={campaign.id}>
                            <div className='cont3'> 
                                <img src={photoUrl(campaign.Id)} style={{height:200, width:"100%",padding:10}}></img>
                            </div>
                            <div className='cont4'>
                                <div className='title'>
                                <p><span style={{fontSize:20,fontWeight:700}}>Title:</span>  {campaign.title}</p>
                                </div>
                                <div className='description'>
                                    <p><span style={{fontSize:20,fontWeight:700}}>Description:  </span> 
                                    {campaign.description}
                                    </p>    
                                </div>
                                <div className='last'>
                                    <div>
                                        <button className="btn" onClick={event =>handleClick(event,campaign.Id)}>Accept Completion</button>
                                    </div>
                                    <div className="target">
                                        <div>
                                            <h3>Target: {campaign.target} | </h3>
                                        </div>
                                        <div>
                                        <h3>Funds Raised: {campaign.funds_raised}</h3> 
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="skill html" style={{width:`${campaign.percentage+"%"}`}}>{campaign.percentage+"%"}</div>
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

export default Donations

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
        transition: ease-in-out all 0.1s;
        transform: scale(1);
    }
      
    .btn:hover {
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

    .cont3{
        width:500px;
    }
`