import { useEffect, useRef, useState } from "react";
import ResourceItem from "../components/ResourceItem";
import CreateFormPopup from "../components/CreateFormPopup";
import Button from "../components/Button";
import ResourceItemPopup from "../components/ResourceItemPopup";
import axios from "axios";

export default function Board() {
  // State variables to manage various aspects of the component
  const [showCreatePopup, setShowCreatePopup] = useState(false); // Manages display of create popup
  const [showResourcePopup, setShowResourcePopup] = useState(null); // Manages display of resource popup
  const [resources, setResources] = useState([]); // Stores resource data fetched from API
  const [searchPhrase, setSearchPhrase] = useState(""); // Manages search input
  const [sort, setSort] = useState('alpha'); // Manages sorting criteria
  const fetchingResources = useRef(false); // Helps track ongoing resource fetching
  const loadedRows = useRef(0); // Helps track the number of loaded rows
  const sortRef = useRef('alpha'); // Helps track the sorting reference

  // Fetch resources from API on initial load
  useEffect(() => {
    fetchResources();
  }, []);

  // Fetch resources when the sort state changes
  useEffect(() => {
    loadedRows.current = 0;
    sortRef.current = sort;
    fetchResources();
  }, [sort]);

  // Add scroll event listener and clean up on unmount
  useEffect(() => {
    scrollListener();
    return () => {
      unScrollListener();
    };
  }, []);

  // Function to add scroll event listener
  function scrollListener() {
    window.addEventListener('scroll', handleScroll);
  };

  // Function to remove scroll event listener
  function unScrollListener() {
    window.removeEventListener('scroll', handleScroll);
  }

  // Function to handle scrolling and fetch more resources when nearing the end
  function handleScroll() {
    const html = window.document.querySelector('html');
    const howMuchScrolled = html.scrollTop;
    const howMuchIsToScroll = html.scrollHeight;
    const leftToScroll = howMuchIsToScroll - howMuchScrolled - html.clientHeight;
    if (leftToScroll <= 100) {
      fetchResources(true);
    }
  };

  // Function to fetch resources from the API
  async function fetchResources(append = false) {
    if (fetchingResources.current) return;
    fetchingResources.current = true;
    axios.get(`/api/resources?sort=${sortRef.current}&loadedRows=${loadedRows.current}`).then(res => {
      if (append) {
        setResources(currentResources => [...currentResources, ...res.data]);
      } else {
        setResources(res.data);
      }

      if (res.data?.length > 0) {
        loadedRows.current += res.data.length;
      }
      fetchingResources.current = false;
    });
  }

  // Function to open create popup
  function openCreatePopup() {
    setShowCreatePopup(true);
  }

  // Function to open resource popup
  function openResourcePopup(resource) {
    setShowResourcePopup(resource);
  }

  // Function to filter resources based on search phrase
  function filterResources(resource) {
    return resource.title.toLowerCase().includes(searchPhrase.toLowerCase());
  }

  return (
    <main className="bg-white md:max-w-3xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      {/* Header section */}
      <div className="bg-gradient-to-r from-emerald-400 to-green-400 p-8">
        <h1 className="font-bold text-xl">Thaler Guide</h1>
        <p className="text-opacity-90 text-slate-700">A Repository for Thaler Resources</p>
      </div>

      {/* Search and create section */}
      <div className="bg-gray-100 px-8 py-2 flex border-b">
        <div className="grow flex items-center">
          <label for="sorting">Sort by:</label>
          <select id="sorting" value={sort} onChange={e => { setSort(e.target.value); }}>
            <option value="alpha">A-Z</option>
            <option value="latest">Latest</option>
          </select>
        </div>
        <input className="" type="text" placeholder="Search" value={searchPhrase} onChange={e => setSearchPhrase(e.target.value)} />
        <div>
          <Button primary onClick={openCreatePopup}>
            Create
          </Button>
        </div>
      </div>

      {/* Resource list */}
      <div className="px-8">
        {/* Map through resources, apply filtering, and render ResourceItem components */}
        {resources.filter(filterResources).map(resource => (
          <ResourceItem key={resource._id} {...resource} onOpen={() => openResourcePopup(resource)} />
        ))}
      </div>

      {/* Create form popup */}
      {showCreatePopup && (
        <CreateFormPopup setShow={setShowCreatePopup} />
      )}

      {/* Resource item popup */}
      {showResourcePopup && (
        <ResourceItemPopup {...showResourcePopup} setShow={setShowResourcePopup} />
      )}
    </main>
  );
}
