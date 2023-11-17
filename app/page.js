'use client'
import { useState } from "react";
import ResourceItem from "./components/ResourceItem";
import CreateFormPopup from "./components/CreateFormPopup";
import Button from "./components/Button";
import ResourceItemPopup from "./components/ResourceItemPopup";

export default function Home() {

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showResourcePopup, setShowResourcePopup] = useState(null);

  function openCreatePopup(){
    setShowCreatePopup(true);
  }

  function openResourcePopup(resource){
    setShowResourcePopup(resource);
  }
  const resources = [
    {title:'HMRC DATA', description:'example'}
  ];

  return (
   
   <main className="bg-white md:max-w-3xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
    <div className="bg-gradient-to-r from-emerald-400 to-green-400 p-8">
      <h1 className="font-bold text-xl">Thaler Guide</h1>
      <p className="text-opacity-90 text-slate-700">A Repository for Thaler Resources</p>
    </div>
    
    <div className="bg-gray-100 px-8 py-2 flex border-b"> 
      <div className="grow"></div>
      <div>
        <Button primary onClick={openCreatePopup} >
        Create
        </Button>
      </div>
    </div>

    <div className="px-8">
      {resources.map(resource => (
      <ResourceItem {...resource} 
                    onOpen={() => openResourcePopup(resource)} />
      ))}

    </div>
    
    {showCreatePopup && (
      <CreateFormPopup setShow={setShowCreatePopup} />
    )}

    {showResourcePopup && (
      <ResourceItemPopup {...showResourcePopup} setShow={setShowResourcePopup}/>

    )}
   </main>
  )
}
