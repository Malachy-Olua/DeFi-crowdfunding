import React,{useContext } from 'react';
import styled from "styled-components";
import { Popover} from "antd";
import { CampaignContext } from '../context/CampaignContext';

const Completed = ({address, Id,active}) => {

    const {onSubmitHandler,fileUrl,complete} = useContext (CampaignContext);

    const handleClick = (event,address,Id) =>{
    
        event.preventDefault();
    
        complete(address,Id);  
    
    }


    const settings2 = (
        <Section>
            <div className='form'>
            <div className="image">
                <img src={fileUrl} height={100} width={200}/>
            </div>
            <form onSubmit={onSubmitHandler}>
                <label for="lname">UploadFile</label>
                <input type="file" name='file' accept="image/png, image/jpeg, image/jpg"/>

                <button className="btnpop" type="submit">Upload File</button><br/>
            </form>
            <button className="btnpop" type="button" onClick={event =>handleClick(event,address,Id)}>Update File</button>
            </div>
        </Section>
    );
  return (
    <Section>
        <div>
            {active?(<Popover 
                content={settings2}
                title="" 
                trigger="click" 
                placement="topLeft"
            >
                <button className="btn" >Complete</button>
            </Popover>):(
                <button className="disabled">
                    Not Active
                </button>
            )}
        </div>
    </Section>
  )
}

export default Completed

const Section = styled.section`

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
    .form {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 300px;
        height:250px;
        margin-bottom:20px;
    }
`