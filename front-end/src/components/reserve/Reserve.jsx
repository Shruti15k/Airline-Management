import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const Reserve = ({setOpen, flightId}) =>{

    const {data,loading,error} = useFetch(`flights/seat/${flightId}`)
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
                    <span>Select your seats:</span>
                    {data.map((item)=>(
                        <div className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.price}</div>
                                <div className="rMax">Max people: <b>{item.maxpeople}</b></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Reserve