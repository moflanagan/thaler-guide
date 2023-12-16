export default function ResourceItem({onOpen, title}) {
  return(
    <a href="" 
       onClick={ e => {e.preventDefault(); onOpen();}}
       className="my-2 px-8 py-4"
       key={title}
       >

      <div className="flex-grow">
        <h2 className="font-bold">{title}</h2>
        
      </div>
    </a>
  );
}