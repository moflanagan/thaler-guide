// Import necessary components and hooks
import Popup from "./Popup"; // Importing Popup component from "./Popup"
import Button from "./Button"; // Importing Button component from "./Button"
import { useState } from "react"; // Importing the useState hook from React
import axios from "axios"; // Importing axios for making HTTP requests

// CreateFormPopup component which takes setShow as a prop
export default function CreateFormPopup({ setShow }) {
  // States to manage title, description, and error messages
  const [title, setTitle] = useState(''); // State for title
  const [description, setDescription] = useState(''); // State for description
  const [error, setError] = useState(''); // State for error messages

  // Function to handle the API call to create a resource
  function createResource() {
    // Check if either title or description is empty or contains only whitespace
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description'); // Set error message if fields are empty
      return;
    }

    // If title and description are provided, make the API call to create a resource
    axios.post('../api/resources', { title, description })
      .then(() => {
        setShow(false); // Close the popup on successful resource creation
      })
      .catch((error) => {
        setError('An error occurred while creating the resource.'); // Set error message on API call failure
        // Handle error (log it or show an error message)
      });
  }

  // Function to handle button click event
  function handleCreateClick(e) {
    e.preventDefault();
    setError(''); // Reset error state on button click
    createResource(); // Call the function to create the resource
  }

  // Render the CreateFormPopup component
  return (
    <Popup setShow={setShow} title={'Create a new resource'}>
      <form className="p-8">

        {/* Title input field */}
        <label className="block mt-4 mb-1 text-slate-700">Title</label>
        <input
          className="w-full border p-2 rounded-md"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on input change
        />

        {/* Description textarea */}
        <label className="block mt-4 mb-1 text-slate-700">Description</label>
        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="Please add a description, example tickets & path to documentation"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state on input change
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
