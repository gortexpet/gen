// ...
import { Suspense } from "react";
import Image from "next/image";
import { enhancedPrompt, createImage } from "../lib/openAIClient";
import Storage from "../lib/storage";

export const revalidate = 10;
export const fetchCache = 'force-no-store';

function getPrompt(data) {
  const entry =
    data.features[Math.floor(Math.random() * data.features.length)].properties;
  const prompt = `${entry.priority} priority ${entry.description} in the neighborhood of ${entry.Neighborhood} at ${entry.location}, ${entry.ZIPCode}`;
  return prompt;
}

async function getIncident() {
  const res = await fetch(
    "https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/911_Calls_for_Service_2022_New/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
  );
  console.log(res)
  return await res.json();
  // return data;
}

async function GenImage({ incident }) {
  const {data, error} = await createImage(incident);
  console.log(data, error)
  // if(data) {
    const url = data?.data[0].url;
  // }
  return (
    <div className="border rounded-xl max-w-2xl overflow-hidden mx-auto shadow-md">
    { url &&
<div>

<Image
          id="gen-image"
          src={url}
          width={1024}
          height={1024}
          alt={incident}
        />
        <Storage prompt={incident} />


</div>
      }
    </div>
  );
}

async function IncidentImage({ prompt }) {
  const p = await enhancedPrompt(prompt);
  const incident = p?.data.choices[0].text;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="mb-6 mx-auto max-w-lg">
        <p className="font-sans text-base">{incident}</p>
      </div>
      <GenImage incident={incident} />
    </div>
  );
}

export default async function Page() {
  const incident = await getIncident();
  const prompt =  getPrompt(incident);
  return (
    <>
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 bg-black text-white flex items-center uppercase text-center justify-center text-2xl font-sans font-bold">
            Loading...
          </div>
        }
      >
        <IncidentImage prompt={prompt} />
      </Suspense>
    </>
  );
}
