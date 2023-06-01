import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

function Page({ countries }) {
  return (
    <div>
          {countries && countries.map((country) => (
            <div key={country.id}>
            
            <div className='mb-6 mx-auto max-w-lg'>
                <p className='font-sans text-base'>
                {country.prompt}
                    {/* {imageResponse.enhancedPrompt} */}
                </p>
                <a href={country.url} target='_blank'>
                  {country.url}
                </a>
            </div>

            <div className="border rounded-xl max-w-2xl overflow-hidden mx-auto shadow-md">
              { country.url &&
     <Image
     src={country.url}
     width={1024}
     height={1024}
     alt={country.prompt}
     />
              }
       
            </div>


        

        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from('AAA').select()
console.log(data)
  return {
    props: {
     countries: data
    },
  }
}

export default Page;