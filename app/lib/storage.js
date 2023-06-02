'use client';
 
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { decode } from 'base64-arraybuffer'

const publicImage =  (name) => { 
  const { data } = supabase
  .storage
  .from('imgs')
  .getPublicUrl(name)
  return data.publicUrl;
}

const storeEntry = async (imgurl, p) => { 
  const url = publicImage(imgurl);
  console.log(imgurl, p)
  return await supabase
  .from('AAA')
  .insert([
    { id: Date.now(), prompt: p, url: url },
  ])
}

const storeImage = async (bsixty, prompt) => {
  const d = new Date();
  const time = d.getTime();
  const {data, error} = await supabase
    .storage
    .from('imgs')
    .upload(`genes/biiip--` +  time  + `.png`, decode(bsixty), {
      contentType: 'image/png'
    })
    if(data) {
        storeEntry(data.path, prompt)
    }
}

function getBase64Image(imgUrl, callback) {

  var img = new Image();

  // onload fires when the image is fully loadded, and has width and height

  img.onload = function(){

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png"),
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    callback(dataURL); // the base64 string

  };

  // set attributes and src 
  img.setAttribute('crossOrigin', 'anonymous'); //
  img.src = imgUrl;

}

export default function Storage({prompt}) {
  useEffect(() => {
    console.log('storage')
    const genurl = document.getElementById('gen-image').getAttribute('src')
    console.log(genurl)
    getBase64Image(genurl, function(base64image){
      storeImage(base64image, prompt)
  });
    return () => {
     };
  }, []);
  return (
    <div></div>
  );
}
