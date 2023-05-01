//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


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
    }

    using Counters for Counters.Counter;
    Counters.Counter private campaignNum;

    
    // Array of all campaigns created.
    // Campaign[] public campaigns;

    // maps an address to a Campaign struct Array.
    mapping(address=>Campaign[]) public creator_to_campaigns;

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
        creator_to_campaigns[msg.sender].push(Campaign(_title, _description, msg.sender, 
        campaign_Id, _url, _target,0,true));

    }


    /**
    * @dev funds a campaign
    * @param _title title of the campaign
    * @param _creatorAddress address of the campaign creator
    */
    function fund (
        string memory _title, 
        address _creatorAddress,
        uint _id
    ) payable external{
        uint256 campaign_Id = campaignNum.current();
        for(uint i=0; i<campaign_Id;i++){
            if(keccak256(abi.encodePacked(creator_to_campaigns[_creatorAddress][i].title))==
                keccak256(abi.encodePacked(_title)) && 
                creator_to_campaigns[_creatorAddress][i].id==_id){
                require(creator_to_campaigns[_creatorAddress][i].funds_raised!=
                creator_to_campaigns[_creatorAddress][i].target,"target already reached.");
                require(creator_to_campaigns[_creatorAddress][i].active=true,"campaign closed");
                creator_to_campaigns[_creatorAddress][i].funds_raised += msg.value; 
                
            }else{
                revert("error occured maybe due to argument unmatching");
            }
        }
    }

    /**
    * @dev closeCampaign closes a campaign
    * @param _title title of the campaign
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of the campaign 
    * @param _url ipfs url of the completed campaing image/picture 
    */
    function closeCampaign(
            string calldata _title, 
            address _creatorAddress, 
            uint _id, 
            string calldata _url
        ) external{

        uint256 campaign_Id = campaignNum.current();
        for(uint i=0; i<campaign_Id;i++){
            if(keccak256(abi.encodePacked(creator_to_campaigns[_creatorAddress][i].title))==
                keccak256(abi.encodePacked(_title)) && 
                creator_to_campaigns[_creatorAddress][i].id==_id){
                require(creator_to_campaigns[_creatorAddress][i].creator_address==msg.sender,
                "you are not the owner of this campaign.");
                require(creator_to_campaigns[_creatorAddress][i].active=true,"campaign closed");
                creator_to_campaigns[_creatorAddress][i].url = _url; 
                creator_to_campaigns[_creatorAddress][i].active = false; 
                
            }else{
                revert("error occured maybe due to argument unmatching");
            }
        }
    }


    /**
    * @dev deleteCampaign deletes a campaign
    * @param _title title of the campaign
    * @param _creatorAddress address of the campaign creator
    * @param _id Id of the campaign  
    */
    function deleteCampaign(string calldata _title, address _creatorAddress, uint _id ) external{

        uint256 campaign_Id = campaignNum.current();
        uint256 ArrLength = creator_to_campaigns[_creatorAddress].length;
        for(uint i=0; i<campaign_Id;i++){
            if(keccak256(abi.encodePacked(creator_to_campaigns[_creatorAddress][i].title))==
                keccak256(abi.encodePacked(_title)) && 
                creator_to_campaigns[_creatorAddress][i].id==_id &&
                creator_to_campaigns[_creatorAddress][i].creator_address==msg.sender){
                creator_to_campaigns[_creatorAddress][i] = creator_to_campaigns[_creatorAddress][ArrLength-1];
                creator_to_campaigns[_creatorAddress].pop();
            }else{
                revert("error occured maybe due to argument unmatching");
            }
            
        }
        
    }
    

}