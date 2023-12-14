import { useEffect, useRef, useState } from "react";
import ResourceItem from "../components/ResourceItem";
import CreateFormPopup from "../components/CreateFormPopup";
import Button from "../components/Button";
import ResourceItemPopup from "../components/ResourceItemPopup";
import axios from "axios";

export default function Board(){

  // State variables
  const [showCreatePopup, setShowCreatePopup] = useState(false); // Manages display of create popup
  const [showResourcePopup, setShowResourcePopup] = useState(null); // Manages display of resource popup
  const [resources, setResources] = useState([]); // Stores resource data fetched from API
  const [searchPhrase, setSearchPhrase] = useState(""); // Manages search input
  const [sort, setSort] = useState('alpha');
  const fetchingResources = useRef(false);
  const loadedRows = useRef(0);
  const sortRef = useRef('alpha');


  // Fetch resources from API on initial load
  useEffect(() => {
    fetchResources();     
  }, []);

  useEffect(() => {
    loadedRows.current = 0;
    sortRef.current = sort;
    fetchResources(); 
  }, [sort]);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  scrollListener();
  return () => {
    unScrollListener();
  };
}, []);


  function scrollListener(){
    window.addEventListener('scroll',handleScroll)
  };

  function unScrollListener(){
    window.removeEventListener('scroll',handleScroll)
  }

  function handleScroll(){
    const html = window.document.querySelector('html');
    const howMuchScrolled= html.scrollTop;
    const howMuchIsToScroll= html.scrollHeight;
    const leftToScroll= howMuchIsToScroll - howMuchScrolled - html.clientHeight;
    if (leftToScroll <= 100) {
      fetchResources(true);
    }
  };
  
  
  async function fetchResources(append=false){
    if (fetchingResources.current) return;
     fetchingResources.current = true;
     axios.get(`/api/resources?sort=${sortRef.current}&loadedRows=${loadedRows.current}`).then(res => {
      if (append){
        setResources(currentResources => [...currentResources, ...res.data]);
      }
      else{
      setResources(res.data);
    }

    if (res.data?.length > 0){
      loadedRows.current += res.data.length;
    }
      fetchingResources.current = false;
  });
}

  // Function to open create popup
  function openCreatePopup(){
    setShowCreatePopup(true);
  }

  // Function to open resource popup
  function openResourcePopup(resource){
    setShowResourcePopup(resource);
  }

  // Function to filter resources based on search phrase
  function filterResources(resource){
    return resource.title.toLowerCase().includes(searchPhrase.toLowerCase());
  }

  return(
    <main className="bg-white md:max-w-3xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      {/* Header section */}
      <div className="bg-gradient-to-r from-emerald-400 to-green-400 p-8">
        <h1 className="font-bold text-xl">Thaler Guide</h1>
        <p className="text-opacity-90 text-slate-700">A Repository for Thaler Resources</p>
      </div>

      {/* Search and create section */}
      <div className="bg-gray-100 px-8 py-2 flex border-b"> 
          <div className="grow flex items-center">
            <span>Sort by:</span>
            <select value={sort} onChange={e => {setSort(e.target.value);}}>  
              <option value="alpha">A-Z</option>
              <option value="latest">Latest</option>
            </select>
          </div>
          <input className="" type="text" placeholder="Search" value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)}/>     
        <div>
          <Button primary onClick={openCreatePopup}>
            Create
          </Button>
        </div>
      </div>

      {/* Resource list */}
      <div className="px-8">
        {resources.filter(filterResources).map(resource => (
          <ResourceItem {...resource} onOpen={() => openResourcePopup(resource)} />
        ))}
      </div>

      {/* Create form popup */}
      {showCreatePopup && (
        <CreateFormPopup setShow={setShowCreatePopup} />
      )}

      {/* Resource item popup */}
      {showResourcePopup && (
        <ResourceItemPopup {...showResourcePopup} setShow={setShowResourcePopup}/>
      )}
    </main>
  );
}
