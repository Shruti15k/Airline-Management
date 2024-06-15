import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faAngleRight,
 
} from "@fortawesome/free-solid-svg-icons";
import { useContext,useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext.js";
import Reserve from "../../components/reserve/Reserve.jsx";


const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {data, loading, error, reFetch} = useFetch(`/flights/find/${id}`)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  const {options}= useContext(SearchContext);

   const handleClick = () =>{
     if(user){
      setOpenModal(true);
     }else{
      navigate("/login")
     }

   };
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      { loading ? ("loading"
       ) :( 
      <div className="hotelContainer">
        
        <div className="hotelWrapper">
          <div className="hotelTop">
            <div className="hotelTopLeft">
              <h1>{data.departcity}</h1>
              <FontAwesomeIcon icon={faAngleRight} className="arrow" />
              <h1>{data.arrivecity}</h1>
            </div>
            <div className="hotelTopCenter">
              <p>{data.departdate}</p>
              <h4>Non-Stop . {options.class} . {options.passengers} travellers</h4>
            </div>
            <div className="hotelTopRight">
              <img
                src={data.photos}
                alt={data.name}
                className="hotelTopImg"
                onClick={() => setOpen(true)}
              />
               <h2 className="hotelName">{data.name}</h2>
            </div>
          </div>
          <div className="hotelDetails">
           
            
            <div className="hotelTimes">
            <div className="siDeparture">
            <div className="siTime">
              <h2>{data.departtime}</h2></div>
            <div className="siCity"><h3>{data.departcity}</h3></div>
           </div>
           <div className="siDuration">
            <div>
              <h3>{data.duration}</h3>
            <hr className="smallLine" />
            </div>
          </div>
              <div className="siArrival">
            <div className="siTime"><h2>{data.arrivetime}</h2></div>
            <div className="siCity"><h3>{data.arrivecity}</h3></div>
          </div>
            </div>
            <div className="hotelExtraInfo">
            <div classname="timm">
              <h4>Baggage </h4>
              <p> per traveller</p>
              </div>
              <div classname="timm">
              <h4> Cabin</h4>
              <p> 7kg (1 piece only) </p>
              </div>
              <div classname="timm">
              <h4>  Check-in</h4>
              <p> 15kg (1 piece only)</p>
                </div>
              
            </div>
            <div className="hotelPrice">
              <h2>Price: ₹{data.price * options.passengers}</h2>
              <button className="bookNow" onClick={handleClick}>Book Now</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} flightId={id}/> }
    </div>
  );
};

export default Hotel;
