'use client';

import './globals.css';
import './robot.css';
import { useState, useEffect } from 'react';


export default function SearchPage() {
    const [prompt, setPrompt] = useState('');
    const [enhancedPrompt, setEnhancedPrompt] = useState('');

    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(0);

    useEffect(() => {



  if (typeof window !== "undefined") {

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
      

        console.log('Component Did Mount') // called once
        fetch('https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/911_Calls_for_Service_2022_New/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
          .then((res) => res.json())
          .then((data) => data.features[Math.floor(Math.random()*data.features.length)].properties)
          .then((entry) => {
            const prompt = `${entry.priority} priority ${entry.description} in the neighborhood of ${entry.Neighborhood} at ${entry.location}, ${entry.ZIPCode}`
            setPrompt(prompt);
            console.log(prompt)
            if(prompt) {
                generateImage(prompt)
            }
          });


  }
      }, []);


//     const logJSONData = async () => {
//         const response = await fetch("https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/911_Calls_for_Service_2022_New/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
//         const jsonData = await response.json();
//         const entry = jsonData.features[jsonData.features.length - 1].properties
//         const prompt = `${entry.priority} priority ${entry.description} in the neighborhood of ${entry.Neighborhood} at ${entry.location}, ${entry.ZIPCode}`

// //Non-emergency priority foot patrol incident in the neighborhood of Curtis Bay at Plum ST and Morrison CT, Baltimore, Md 21226

//         setSitch(prompt);
//         console.log(sitch);

//     }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // setLoading(1);
        console.log(prompt)

        console.log(JSON.stringify({
            prompt
        }));

        const response = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            })
        });
        // const imageResponse = await response.json();
        // // setImageURL(imageResponse.imageURL)
        // console.log(imageResponse);
        // setImageURL(imageResponse.imageURL);
        // setLoading(0);
    }


    const generateImage = async (prompt) => {
        // event.preventDefault()
        // console.log(p);
        // console.log(JSON.stringify({
        //     p
        // }));
        setLoading(1);
        const response = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            })
        });
        const imageResponse = await response.json();
        // setImageURL(imageResponse.imageURL)
        console.log(response);


        setImageURL(imageResponse.imageURL);
        setEnhancedPrompt(imageResponse.enhancedPrompt);

        setLoading(0);
    }



    if (loading) {
        return <Loading></Loading>
    }

    if (imageURL !== '' && enhancedPrompt !== '' &&  loading === 0) {
        return (
            <div className="imageContainer">
                <p style={{zIndex: 10, position: 'fixed', top:0, left:0, background: 'white', maxWidth: '300px'}}>{enhancedPrompt}</p>
                <img src={imageURL}></img>
            </div>
        )
    }

    return (
        <div>
            {/* <button onClick={logJSONData}>Generate</button> */}
            <div className="search-box">

                {/* <form action='/api/image' method="post"> */}
                <form onSubmit={handleSubmit}>
                    <button className="btn-search"><i className="fa fa-search"></i></button>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Generate Image with AI ..."></input>
                </form>
            </div>
        </div>
    )
}

function Loading() {
    return (
        <div>
            <div style={{ textAlign: "center", fontFamily: "arial", color: "#D3D3D3" }}> generating your image ....</div>
        </div>
    )
}
