import React,{  useContext } from 'react';
import styled from "styled-components";
import { Input, Popover} from "antd";
import { CampaignContext } from '../context/CampaignContext';

const Button = ({address, Id, active, raising_funds}) => {

    const {fund,onSearchChange} = useContext (CampaignContext);

    const handleClick = (event,param1,param2) =>{
    
        event.preventDefault();
    
        fund(param1,param2);  
    
    }

    const settings = (
        <Section>
          <div style={{color:"#ff0066"}}>Deposit to Campaign</div>
          <div>
            <Input placeholder="0" type="number" step ="0.0001" onChange={onSearchChange} />
          </div><br/>
            <div >
                <button className="donate" onClick={event =>handleClick(event,address,Id)}>Donate</button>
            </div>
        </Section>
    );
        
  return (
    <Section>
        <div>
            {raising_funds && active?(<Popover 
            content={settings}
            title="" 
            trigger="click" 
            placement="topLeft"
        >
        <button className="btn">Click to Donate</button>
        </Popover>):(
            <button className="disabled">
                Not Active
            </button>
        )}
        </div>
    </Section>
  )
}

export default Button

const Section = styled.section`

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

`