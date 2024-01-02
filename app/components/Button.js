// This is a functional component named Button, exported as the default component
export default function Button(props) {
  return (
    // Renders a button element with props spread onto it
    <button
      {...props} // Spread all properties onto the button element
      className={
        "py-1 px-4 rounded-md " + // Base classes for styling the button

        // Conditional class based on the 'primary' prop:
        // If 'primary' prop is truthy, apply classes for a primary button (bg-emerald-600 and text-white),
        // otherwise, apply classes for a secondary button (text-gray-600)
        (props.primary ? 'bg-green-600 text-white' : 'text-gray-600')
      }
      type="button" // Specifies the button type as 'button'
    />
  );
}
