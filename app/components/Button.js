export default function Button(props) {
  return(
    <button {...props} className={"py-1 px-4 rounded-md " 
    + (props.primary ? 'bg-emerald-600 text-white' : 'text-gray-600')
   }/>
  );
}