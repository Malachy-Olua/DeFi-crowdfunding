import React,{ useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import {Popover} from "antd";
import { CampaignContext } from '../context/CampaignContext';
import {AiOutlineDelete} from  "react-icons/ai";


const Delete = ({address, Id}) => {

    const {_delete} = useContext (CampaignContext);

    const handleClick = (event,address,Id) =>{
    
        event.preventDefault();
    
        _delete(address,Id);
    
    }

    const settings = (
        <Section>
            <div style={{color:"#ff0066"}}>Delete Campaign</div><br/>
            <div>
                <button className="donate" type='button' onClick={event =>handleClick(event,address,Id)}>Delete</button>
            </div>
        </Section>
    );
  return (
    <div>
        <Popover 
            content={settings}
            title="" 
            trigger="click" 
            placement="topLeft"
        >
        <AiOutlineDelete/>
        </Popover>
    </div>
  )
}

export default Delete

const Section = styled.section`
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

`