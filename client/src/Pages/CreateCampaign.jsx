import React from 'react';
import styled from "styled-components";
import crowd from "../images/crowd.jpg";

const CreateCampaign = () => {
  return (
    <Section>
        <div className='image'>
            <img src={crowd} ></img>
        </div>
        <div className='form'>
            <form action="/action_page.php">
                <label for="fname">Campaign Title</label>
                <input type="text" id="fname" name="firstname" placeholder="Your Campaign Title.."/>

                <label for="fname">Target</label>
                <input type="Number" id="fname" name="firstname" placeholder="Your Campaign Title.."/>

                <label for="lname">Description</label>
                <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="A brief description of your campaign.."/>
                
                <label for="lname">UploadFile</label>
                <input type="file" name='file' accept="image/png, image/jpeg, image/jpg"/>

                <button type="submit" value="Submit">Upload File</button><br/>
                <button type="submit" value="Submit">Create Campaign</button>
            </form>
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