// ...
import { Suspense } from 'react';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

// Non-Emergency priority Repo in the neighborhood of Midtown-Edmondson at 600 APPLETON ST BALTIMORE MD, 21217
// async function getIncident() {
//     const res = await fetch('https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/911_Calls_for_Service_2022_New/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
//     const data = await res.json()
//     const randm = (d) => Math.floor(Math.random()*d.features.length)
//     const entry = data.features[randm(data)].properties
//     const prompt = `${entry.priority} priority ${entry.description} in the neighborhood of ${entry.Neighborhood} at ${entry.location}, ${entry.ZIPCode}`
//     return prompt
// }

 async function IncidentImage(prompt) {
    const response =  await fetch('/api/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt
        })
    });
    const imageResponse =  await response.json();
    const { data, error } =  supabase
    .from('AAA')
    .insert([
      { id: Date.now(), prompt: imageResponse.enhancedPrompt, url: imageResponse.imageURL },
    ])
    return (

<div></div>
      // <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">


      //       <div className='mb-6 mx-auto max-w-lg'>
      //           <p className='font-sans text-base'>
      //           {/* {imageResponse.enhancedPrompt} */}
      //               {/* {imageResponse.enhancedPrompt} */}
      //           </p>
      //       </div>

      //       <div className="border rounded-xl max-w-2xl overflow-hidden mx-auto shadow-md">
      //       <Image
      //           src={imageResponse.imageURL}
      //           width={1024}
      //           height={1024}
      //           alt="Picture of the author"
      //           />
      //       </div>
      //   </div>

      );

}
// async function IncaidentImage({ prompt }) {
//     // Wait for the playlists
//     // const genImage = await getImage(prompt);
   
//     return (
//       <ul>
//      <li>

//      </li>
//       </ul>
//     );
//   }
   
  // export default async function Generate() {
  //   // Wait for the artists
  //   const incident = await getIncident();
  //   return (
  //     <>
  //       <Suspense fallback={<div className='fixed inset-0 z-50 bg-black text-white flex items-center uppercase text-center justify-center text-2xl font-sans font-bold'>Loading...</div>}>
  //         {/* <IncidentImage prompt={incident} /> */}
  //       </Suspense>
  //     </>
  //   );
  // }





function Generate({ incident }) {
    const ins = IncidentImage(incident);
    console.log(ins)
    // console.log('incident', incident)
    return (
      <>
        {/* <Suspense fallback={<div className='fixed inset-0 z-50 bg-black text-white flex items-center uppercase text-center justify-center text-2xl font-sans font-bold'>Loading...</div>}> */}
          {/* <IncidentImage prompt={incident} /> */}
        {/* </Suspense> */}
      </>
    );
  }
  
  export async function getServerSideProps() {
    // let { data } = await getIncident()
    //   const incident = await getIncident();
    const res = await fetch('https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/911_Calls_for_Service_2022_New/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
    const data = await res.json()
    const randm = (d) => Math.floor(Math.random()*d.features.length)
    const entry = data.features[randm(data)].properties
    const prompt = `${entry.priority} priority ${entry.description} in the neighborhood of ${entry.Neighborhood} at ${entry.location}, ${entry.ZIPCode}`

    return {
      props: {
       incident: prompt
      },
    }
  }
  
  export default Generate;