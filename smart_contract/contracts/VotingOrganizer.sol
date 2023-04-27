//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Invest{

    struct Investment{
        address investor_address;
        uint invest_num_Id;
        string toke_name;
        string token_symbol;
        address token_address;
        uint token_amount;
        uint lockDate;
        uint unlockDate;
        int USDC_price;
        uint percent_interest;
        uint received_interest;
        bool active;
    }

    struct Token{
        uint token_identity;
        string token_name;
        string token_symbol;
        address token_address; 
    }

    using Counters for Counters.Counter;
    Counters.Counter private token_num;
    Counters.Counter private invest_num;

    AggregatorV3Interface internal priceFeed;
    address private owner;
    /**
    * Network: Sepolia
    * Aggregator: USDC / USD
    * Address: 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E
    */
    constructor() {
        owner = payable(msg.sender);
        priceFeed = AggregatorV3Interface(
            0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E//sepolia testnet usdc/usd address
        );
    }

    mapping(string=>Token) private myTokens;//symbol to Token

    mapping(address=>Investment[]) private address_investment;

    uint256 private total_amount_generated;

    event Response(bool success);

    modifier onlyOwner{
        require(owner == msg.sender, "only owner may call this function");
        _;
    }


    function addToken(string calldata _name, string calldata _symbol, address _tokenAddress) external onlyOwner{
        //tokenSymbols.push(symbol);
        token_num.increment();
        uint256 token_num_Id = token_num.current();

        myTokens[_symbol] = Token(
            token_num_Id,
            _name,
            _symbol,
            _tokenAddress
        );

    }

    /**
    * Returns the latest price.
    */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    function invest(string memory _symbol, uint _amount, uint _numDays, uint _interest)external {
        require(myTokens[_symbol].token_identity != 0, "This token isnt available");
        invest_num.increment();
        uint256 invest_num_Id = invest_num.current();

        //transfer the token from the user address to the contract
        IERC20(myTokens[_symbol].token_address).transferFrom(msg.sender,address(this),_amount);

        Investment memory newInvestment = Investment(
            msg.sender,
            invest_num_Id,
            myTokens[_symbol].token_name,
            _symbol,
            myTokens[_symbol].token_address,
            _amount,
            block.timestamp,
            block.timestamp + (_numDays * 1 days),
            getLatestPrice(),
            _interest,
            _amount*(_interest/100),
            true
        );
        address_investment[msg.sender].push(newInvestment);

        total_amount_generated += _amount;

    }


    function getInvestmentsByAddress(address _invest_owner)external view returns(Investment[] memory){

        return address_investment[_invest_owner];
        
    }

    function get_total_Amount_Generated()external view returns(uint256){
        return total_amount_generated;
    }

    function withdraw(string calldata _symbol)external payable onlyOwner{
         
        require(total_amount_generated>0,"Balance too low for a withdrawal!");
        IERC20(myTokens[_symbol].token_address).transfer(msg.sender, total_amount_generated);
        total_amount_generated -= total_amount_generated;

    }


}