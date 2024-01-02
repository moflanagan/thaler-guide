// Importing the Popup component from the "./Popup" file
import Popup from "./Popup";

// ResourceItemPopup component definition
export default function ResourceItemPopup({ title, description, setShow }) {
  return (
    // Rendering a Popup component with specific content
    <Popup title={''} setShow={setShow}>
      {/* Content inside the Popup */}
      <div className="p-8"> {/* Padding for the content */}
        <h2 className="text-lg font-bold mb-2">{title}</h2> {/* Title of the resource */}
        {/* Displaying the description content (with line breaks) */}
        <p dangerouslySetInnerHTML={{__html: description.replace(/\n/gi, "<br />")}}></p>
      </div>
    </Popup>
  );
}

