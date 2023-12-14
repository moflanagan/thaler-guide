import Popup from "./Popup";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

export default function CreateFormPopup({ setShow }) {
  // States to manage title, description, and error messages
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Function to handle the API call to create a resource
  function createResource() {
    // Check if either title or description is empty or contains only whitespace
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description');
      return;
    }

    // If title and description are provided, make the API call
    axios.post('../api/resources', { title, description })
      .then(() => {
        setShow(false); // Close the popup on successful resource creation
      })
      .catch((error) => {
        setError('An error occurred while creating the resource.');
        // Handle error (log it or show an error message)
      });
  }

  // Function to handle button click event
  function handleCreateClick(e) {
    e.preventDefault();
    setError(''); // Reset error state on button click
    createResource(); // Call the function to create the resource
  }

  return (
    <Popup setShow={setShow} title={'Create a new resource'}>
      <form className="p-8">

        <label className="block mt-4 mb-1 text-slate-700">Title</label>

        <input
          className="w-full border p-2 rounded-md"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mt-4 mb-1 text-slate-700">Description</label>

        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="Please add a description, example tickets & path to documentation"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Display error message if there is any */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex gap-2 mt-2 justify-end">
          {/* Button triggers handleCreateClick function on click */}
          <Button primary onClick={handleCreateClick}>Create</Button>
        </div>
      </form>
    </Popup>
  );
}
