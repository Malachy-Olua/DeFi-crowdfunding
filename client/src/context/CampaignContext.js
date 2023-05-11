
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';
import { crowdFunding, crowdFundingABI } from "../utils/Constants";
import { Alchemy, Network } from 'alchemy-sdk';
import { useAccount } from 'wagmi'


const { ethereum } = window;

export const CampaignContext = React.createContext();



const getReadContract = async()=> {

    const Web3 = require('web3');
    const web3 = new Web3('https://rpc-mumbai.maticvigil.com/v1/f9d55ce5ba614d5dbc73f57b0773c5318b675247');
    const contractAddress = crowdFunding; // replace this with your contract address
    const abi = crowdFundingABI
    const contract = new web3.eth.Contract(abi, contractAddress);
    // const greeting = await contract.methods.getCampaigns().call();
    //console.log(greeting);
  return contract;
}

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


export const CampaignProvider = ({children}) => {

    const projectId = '2PIPosm7XBZUlQO1DMALuDkYcfm';
    const projectSecret = '09b2d56a6a476aa8c38caeb237835410';
    const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

   
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
    
   
   
    const [formData, setFormData] = useState({campaignTitle:'', target:'',description:''});
    const[fileUrl,setFileUrl]=useState(null);
    const[IsSentUrl,setIsSentUrl]=useState(false);
    const[IsFundLoading,setIsFundLoading]=useState(false);
    const[organisedCampaigns,setOrganisedCampaigns]=useState([]);
    const[MyCampaigns,setMyCampaigns]=useState([]);
    const[MyDonations,setMyDonations]=useState([]);
    const [amount, setAmount] = useState('');

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value}); 
        console.log(formData);
    }

    const onSearchChange = event => {
        console.log(event.target.value);
        setAmount(event.target.value);
    }


    //----UPLOAD TO IPFS VOTER IMAGE
    const onSubmitHandler = async (event) => {

        event.preventDefault();

        const form = event.target;
        const files = form[0].files;
        
    
        if (!files || files.length === 0) {
          return alert("No files selected");
        }
    
        const file = files[0];
        //console.log(file);
        const added = await client.add(file)
        //console.log(added);
        const url = `https://infura-ipfs.io/ipfs/${added.path}`
        setIsSentUrl(true)
        setFileUrl(url)
        // setTimeout(()=>{
        //     setIsSentUrl(false)
        //     setFileUrl(url);
        // },9000);
        
        
       
        console.log(url);
        form.reset();
    };

    
    
    const checkIfWalletIsConnected = async() =>{
        if(!window.ethereum) return alert('Please install a wallet first');

        if(true){
           
            //console.log(account[0])
            getAllCampaigns();
           
        }else{
            
        }
    }

    
    const createCampaign = async(e) => {

        e.preventDefault();
        try {

            if(!ethereum) return alert('Please install metamask');
           
            const{campaignTitle, target, description} = formData;

            if( !campaignTitle || !target || !description|| !fileUrl) return alert("input data is missing");

            if(Math.sign(target) == -1 || Math.sign(target) == -0) return(
                alert("Invalid input!")
            );

            const parsedAmount = ethers.utils.parseEther(target);

            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.openCampaign(campaignTitle,description,fileUrl,parsedAmount);
            alert("Please wait for transaction to process...");
            await campaign.wait();
            console.log(campaign);
            window.location.reload();
        } catch (error) {
            alert(error.Error);
        }
    }


    const _delete = async(address,Id) => {

        
        try {

            if(!ethereum) return alert('Please install a wallet');
           
    
            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.deleteCampaign(address,Id);
            alert("Please wait for transaction to process...")
            await campaign.wait();
            console.log(campaign);
            window.location.reload();
        } catch (data) {
            alert(data.message);
        }
    }


    const acceptCompletion = async(Id) => {
        try {

            if(!ethereum) return alert('Please install a wallet');
        
            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.acceptCompletion(Id);
            alert("Please wait for transaction to process...")
            await campaign.wait();
            console.log(campaign);
            window.location.reload();
        } catch (error) {
            alert(error.Error);
        }
    }


    const complete = async(address,Id) => {

        try {

            if(!ethereum) return alert('Please install a wallet');
           
            if(!fileUrl) return alert("input data is missing");

            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.closeCampaign(address,Id,fileUrl);
            alert("Please wait for transaction to process...")
            await campaign.wait();
            //console.log(campaign);
            window.location.reload();
        } catch (error) {
            alert(error.Error);
        }
    }


    const fund = async (_address, _Id) => {

        try {

            if(!ethereum) return alert('Please install a wallet first');

            if( !amount ) return alert("input data is missing");

            if(Math.sign(amount) == -1 || Math.sign(amount) == -0) return(
                alert("Invalid input!")
            );
            
            const parsedAmount = ethers.utils.parseEther(amount);

            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.fund( _address, _Id,{value:parsedAmount});

            setIsFundLoading(true);
            alert("Please wait for transaction to process...")
            await campaign.wait();
            setIsFundLoading(false);
            window.location.reload()
            

        } catch (error) {
            console.log(error.Error)
        }

    }


    const withdraw = async (address, Id) => {

        try {

            if(!ethereum) return alert('Please install a wallet first');

            const campaignContract = getCampaignContract();
            const campaign  = await campaignContract.withdraw( address, Id);

            setIsFundLoading(true);
            alert("Please wait for transaction to process...")
            await campaign.wait();
            setIsFundLoading(false);
            window.location.reload()
            
        } catch (data) {
            alert(data.message)
        }

    }


    const getAllCampaigns = async() =>{
        
        try {
            const Web3 = require('web3');
            const web3 = new Web3('https://rpc-mumbai.maticvigil.com/v1/f9d55ce5ba614d5dbc73f57b0773c5318b675247');
            const contractAddress = crowdFunding; // replace this with your contract address
            const abi = crowdFundingABI
            const contract = new web3.eth.Contract(abi, contractAddress);
            

            //const campaign = await campaignContract.getCampaigns();
            const campaign = await contract.methods.getCampaigns().call();
            console.log(campaign);
            const filteredCampaigns = campaign.filter(campaign => parseInt(campaign.id) != 0)
            const organisedCampaigns = filteredCampaigns.map((campaign)=>({
                title:campaign.title,
                description:campaign.description,
                creator_address: campaign.creator_address,
                Id: campaign.id,
                url: campaign.url,
                target: parseInt(campaign.target)/(10**18),
                funds_raised: parseInt(campaign.funds_raised)/(10**18) ,
                active:campaign.active,
                raising_funds:campaign.raising_funds,
                isDeleted:campaign.isDeleted,
                percentage: (((parseInt(campaign.funds_raised)/(10**18))/(parseInt(campaign.target)/(10**18)))*100)
            }));
            
            setOrganisedCampaigns(organisedCampaigns);
            console.log(organisedCampaigns);
        } catch (error) {
            //console.log(error.Error);
        }
    
    }


    const getMyCampaigns = async(address) =>{
        
        try {
            if(!ethereum) return alert('Please install a wallet first');
            const campaignContract = getCampaignContract();

            const campaign = await campaignContract.getMyCampaigns(address);
            //console.log(campaign);

            const organisedCampaigns = campaign.map((campaign)=>({
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
        } catch (error) {
            console.log(error.Error);
        }
    
    }


    const getMyDonations = async(address) =>{
        
        try {
            if(!ethereum) return alert('Please install a wallet first');
            const campaignContract = getCampaignContract();

            const campaign = await campaignContract.getMyDonations(address);
            //console.log(campaign);

            const organisedCampaigns = campaign.map((campaign)=>({
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
            // console.log(organisedCampaigns);
        } catch (error) {
            console.log(error.Error);
        }
    
    }


    useEffect(()=>{

        checkIfWalletIsConnected();
        

    },[])

    return(
        <CampaignContext.Provider value={{
            handleChange, 
            organisedCampaigns,
            getMyCampaigns,
            onSearchChange,
            onSubmitHandler,
            fund,
            fileUrl,
            createCampaign,
            MyCampaigns,
            complete,
            _delete,
            getMyDonations,
            MyDonations,
            acceptCompletion,
            IsSentUrl,
            IsFundLoading,
            withdraw,
            getAllCampaigns,
            }}>
            {children}
        </CampaignContext.Provider>
    )
}


