import React,{useContext } from 'react';
import styled from "styled-components";
import { CampaignContext } from '../context/CampaignContext';


const CreateCampaign = () => {

    const {createCampaign,handleChange,onSubmitHandler,fileUrl} = useContext (CampaignContext);

    
  return (
    <Section>
        <div className='image'>
            <img src={fileUrl} alt='campaign'></img>
        </div>
        <div className='form'>
            <label>Campaign Title</label>
            <input type="text" id="fname" name="campaignTitle" placeholder="Your Campaign Title.."  onChange={handleChange}/>

            <label >Target In ETH</label>
            <input type="Number" id="fname" name="target" placeholder="Your Campaign Title.." onChange={handleChange}/>

            <label >Description</label>
            <textarea id="w3review" name="description" rows="4" cols="50" placeholder="A brief description of your campaign.."  onChange={handleChange}/>
                
            <form onSubmit={onSubmitHandler}>
                <label >UploadFile</label>
                <input type="file" name='file' accept="image/png, image/jpeg, image/jpg"/>

                <button type="submit" >Upload File</button><br/>
            </form>
            <button type="button" onClick={createCampaign}>Create Campaign</button>
        </div>
    </Section>
  )
}

export default CreateCampaign
const Section = styled.section`

    display:flex;
    justify-content:space-around;
    align-items:center;
    margin-top:50px;
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
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    button {
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #45a049;
    }

    
    .form {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 500px;
        height:500px;
        margin-bottom:20px;
    }

    .image{
        border:1px solid black;
        border-radius: 5px;
        height: 300px;
        width:600px;
        img{
            width:580px;
            padding:10px;
            height:280px;
        }
    }

`