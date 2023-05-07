//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";



contract CrowdFunding{

    //contains the information of a campaign.
    struct Campaign{
        string title;
        string description;
        address creator_address;
        uint id;
        string url;
        uint target;
        uint funds_raised;
        bool active;
        bool raising_funds;
        bool isDeleted;
    }

    using Counters for Counters.Counter;
    Counters.Counter private campaignNum;

    //will help get all campaigns
    mapping(uint=>Campaign) private allCampaings;

    mapping(address=>mapping(uint=>Campaign)) private creator_Id_campaings;
    mapping(address=>mapping(uint=>bool)) private donorFundedCamp;
    mapping(address=>mapping(uint=>Campaign)) private myDonations;

    //helps check number of donors in a campaign
    mapping(uint=>address[]) private donors_To_camp;

    //helps check if a donor has already been added to the array in donors_To_camp
    mapping(address=>mapping(uint=>bool)) private ifAddedtoArray;


    //adds a donor address to the array after accepting completion
    mapping(uint => address[]) private campaignVotersArray;

    //helps check if a donor has already been added to the array in campaignVotersArray
    mapping(address=>mapping(uint=>bool)) private ifAddedtoVotersArray;


    uint public _lengthDonor;
    uint public _lengthVoter;

    /**
    * @dev creates a campaign
    * @param _title title of the campaign
    * @param _description of the campaign 
    * @param _url ipfs url of the campaing image/picture
    */
    function openCampaign(
        string calldata _title, 
        string calldata _description, 
        string calldata _url,
        uint _target) external {

        campaignNum.increment();
        uint256 campaign_Id = campaignNum.current();

        Campaign memory newCampaign = Campaign(_title, _description, msg.sender, 
        campaign_Id, _url, _target,0,true, true, false); 
        creator_Id_campaings[msg.sender][campaign_Id] = newCampaign;
        allCampaings[campaign_Id] = newCampaign;
    }

    /**
    * @dev fund a campaign
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of campaign
    */
    function fund (
        address _creatorAddress,
        uint _id
    ) payable external{
        
        require(creator_Id_campaings[_creatorAddress][_id].active==true,"campaign closed");
        require(creator_Id_campaings[_creatorAddress][_id].raising_funds==true,"Target reached");
        require(creator_Id_campaings[_creatorAddress][_id].isDeleted==false,"campaign deleted");

        creator_Id_campaings[_creatorAddress][_id].funds_raised += msg.value;
        allCampaings[_id].funds_raised += msg.value;
        if(creator_Id_campaings[_creatorAddress][_id].funds_raised ==
        creator_Id_campaings[_creatorAddress][_id].target){
            creator_Id_campaings[_creatorAddress][_id].raising_funds = false;
            allCampaings[_id].raising_funds = false;
        }
        donorFundedCamp[msg.sender][_id]=true;
        address _address = msg.sender;
        updateDonorArray(_address,_id);
        myDonations[msg.sender][_id] = creator_Id_campaings[_creatorAddress][_id];
    }

    function updateDonorArray(address _address, uint _id) private{
        
        if(ifAddedtoArray[_address][_id]==false){
            donors_To_camp[_id].push(_address);
            ifAddedtoArray[_address][_id]=true;
        }

        _lengthDonor = donors_To_camp[_id].length;

    }


    /**
    * @dev closeCampaign closes a campaign
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of the campaign 
    * @param _url ipfs url of the completed campaing image/picture 
    */
    function closeCampaign(
        address _creatorAddress, 
        uint _id, 
        string calldata _url
    ) external{
        require(creator_Id_campaings[_creatorAddress][_id].creator_address==msg.sender,
        "you are not the owner of this campaign.");
        require(creator_Id_campaings[_creatorAddress][_id].active==true,"campaign closed");
        creator_Id_campaings[_creatorAddress][_id].url=_url;
        creator_Id_campaings[_creatorAddress][_id].active = false;

        allCampaings[_id].url=_url;
        allCampaings[_id].active = false;

        myDonations[msg.sender][_id].url=_url;
        myDonations[msg.sender][_id].active = false;
    }

    /**
    * @dev deleteCampaign deletes a campaign
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of the campaign  
    */
    function deleteCampaign(
        address _creatorAddress, 
        uint _id 
    ) external{
        require(creator_Id_campaings[_creatorAddress][_id].creator_address==msg.sender,
        "you are not the owner of this campaign.");
        require(creator_Id_campaings[_creatorAddress][_id].active==true,"campaign closed");
        require(creator_Id_campaings[_creatorAddress][_id].funds_raised==0,
        "You cant delete now. Funds indside the campaign");

        creator_Id_campaings[_creatorAddress][_id].isDeleted = true;
        allCampaings[_id].isDeleted = true;
        myDonations[msg.sender][_id].isDeleted = true;
    }

    /**
    * @dev acceptCompletion accepts/Votes for the completion of a project 
    * @param _id Id of the campaign  
    */
    function acceptCompletion(
        uint _id 
    ) external{
        require(donorFundedCamp[msg.sender][_id]==true,"You are not part of the donors");
        address _address = msg.sender;
        updateCampaignVotersArray(_id, _address);
    }

    /**
    * @dev updateCampaignVotersArray helper function. updates campaignVotersArray
    * @param _address address of the campaign donor
    * @param _id Id of the campaign  
    */
    function updateCampaignVotersArray(uint _id, address _address)private{

        if(ifAddedtoVotersArray[_address][_id]==false){
            campaignVotersArray[_id].push(_address);

            ifAddedtoVotersArray[_address][_id] = true;
        }

        _lengthVoter = campaignVotersArray[_id].length;
    }

    /**
    * @dev withdraw withdraws funds into the campaign creator's wallet 
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of the campaign  
    */
    function withdraw(address payable _creatorAddress, uint _id ) payable external{
        require(creator_Id_campaings[_creatorAddress][_id].creator_address==msg.sender,
        "you are not the owner of this campaign.");
        require(creator_Id_campaings[_creatorAddress][_id].raising_funds==false,"Funding still going on");

        if(creator_Id_campaings[_creatorAddress][_id].funds_raised ==
        creator_Id_campaings[_creatorAddress][_id].target){

            uint256 funds = (creator_Id_campaings[_creatorAddress][_id].funds_raised)/2;
            _creatorAddress.transfer(funds);
            creator_Id_campaings[_creatorAddress][_id].funds_raised -= funds;
            allCampaings[_id].funds_raised -= funds;
            
        }else if(creator_Id_campaings[_creatorAddress][_id].funds_raised <= 
            (creator_Id_campaings[_creatorAddress][_id].target)/2){
            
            require(campaignVotersArray[_id].length > 0,"Project not accepted by any donor yet");
            require(campaignVotersArray[_id].length>=(donors_To_camp[_id].length)/4,
            "Upto a quarter of total donors have to accept the project completion");
            uint256 funds = creator_Id_campaings[_creatorAddress][_id].funds_raised;
            _creatorAddress.transfer(funds);
            creator_Id_campaings[_creatorAddress][_id].funds_raised -= funds;
            allCampaings[_id].funds_raised -= funds;
        }
    
    }

    /**
    * @dev getCampaigns gets all campaigns created 
    */
    function getCampaigns() external view returns(Campaign[] memory){
        uint256 campaign_Id = campaignNum.current();
        Campaign[] memory campaignArray = new Campaign[](campaign_Id);
        for(uint i=0; i<campaign_Id;i++){
            uint index = i+1;
            if(allCampaings[index].isDeleted==true){
                continue;
            }
            campaignArray[i] = allCampaings[index];
        }
        return campaignArray;
    }

    /**
    * @dev getMyCampaigns gets all campaigns created by an address 
    * @param _creatorAddress address of the campaign creator
    */
    function getMyCampaigns(address _creatorAddress)external view returns(Campaign[] memory){
        
        uint256 campaign_Id = campaignNum.current();
        Campaign[] memory campaignArray = new Campaign[](campaign_Id);
        for(uint i=0; i<campaign_Id;i++){
            uint index = i+1;
            if(creator_Id_campaings[_creatorAddress][index].isDeleted==true){
                continue;
            }
            campaignArray[i] = creator_Id_campaings[_creatorAddress][index];
        }
        return campaignArray;
    }

    /**
    * @dev getMyDonations gets all campaigns an address has donated into
    * @param _donorAddress address of a campaign donor
    */
    function getMyDonations(address _donorAddress)external view returns(Campaign[] memory){
        uint256 campaign_Id = campaignNum.current();
        Campaign[] memory campaignArray = new Campaign[](campaign_Id);
        for(uint i=0; i<campaign_Id;i++){
            uint index = i+1;
            if(myDonations[_donorAddress][index].isDeleted==true){
                continue;
            }
            campaignArray[i] = myDonations[_donorAddress][index];
        }
        return campaignArray;
    }

    
}
