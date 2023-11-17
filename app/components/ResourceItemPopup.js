import Popup from "./Popup";

export default function ResourceItemPopup({title,description, setShow}){
  return(
    <Popup title={''} setShow={setShow}>
      <div className="p-8">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p>{description}</p>
      </div>
    </Popup>
  );
}