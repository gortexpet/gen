import { supabase } from "./lib/supabaseClient";
import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 10;
export const fetchCache = 'force-no-store';

async function EntriesList() {
  const data = await getData();

  return (
    <div className="px-4 mb-16">
      {data?.map((entry) => (
        <div key={entry.id}>
          <div className="mb-4 md:mb-6 mt-16 mx-auto max-w-lg">
            <p className="font-sans text-base">
              {entry.prompt}
            </p>
          </div>

          <div className="border rounded-xl max-w-2xl overflow-hidden mx-auto shadow-md">
            <Image
              src={entry.url}
              width={1024}
              height={1024}
              alt={entry.prompt}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      ))}
    </div>
  );
}

async function getData() {
  let { data, error } = await supabase.from("AAA").select();
  if (error) {
    throw new Error("Failed to fetch data");
  }
  return data;
}

export default async function Page() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 bg-black text-white flex items-center uppercase text-center justify-center text-2xl font-sans font-bold">
            Generating...
          </div>
        }
      >
        <EntriesList />
      </Suspense>
    </main>
  );
}
