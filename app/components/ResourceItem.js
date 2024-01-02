// ResourceItem component definition
export default function ResourceItem({ onOpen, title }) {
  return (
    // Anchor tag acting as a clickable resource item
    <a
      href="" // Empty href to prevent default link behavior
      onClick={e => { // Click event handler
        e.preventDefault(); // Prevents the default link behavior
        onOpen(); // Calls the onOpen function passed as a prop
      }}
      className="my-2 px-8 py-4" // Styling for the clickable area
    >
      <div className="flex-grow"> {/* Container for the resource item */}
        <h2 className="font-bold">{title}</h2> {/* Title of the resource */}
      </div>
    </a>
  );
}
