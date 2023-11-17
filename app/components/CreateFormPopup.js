import Popup from "./Popup";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";


export default function CreateFormPopup({setShow}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  function createResource(e){
    e.preventDefault();
    axios.post('../api/resources',{title, description})
    .then(() => {
      setShow(false);

    });
  }
  return(
   <Popup setShow={setShow} title={'Create a new resource'}>
      <form className="p-8">

        <label className=" block mt-4 mb-1 text-slate-700">Title</label>

        <input className="w-full border p-2 rounded-md" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>

        <label className=" block mt-4 mb-1 text-slate-700">Description</label>

        <textarea className="w-full border p-2 rounded-md" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>

        <div className="flex gap-2 mt-2 justify-end">
        <Button>Attach Files</Button>
        <Button primary onClick={createResource}>Create</Button>
        </div>
      </form>
   </Popup>
  );
}