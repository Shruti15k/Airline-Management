import "./propertyList.css";
import useFetch from "../../hooks/useFetch.js";

const PropertyList = () => {

  const {data,loading,error} = useFetch("/flights/countByType");
  
   const images = [
    "https://i.pinimg.com/originals/03/f4/8a/03f48a399a46bf0e00fc279dcc3ba608.png",
    "https://stafftraveler.com/img/airlines/tails/AI.png",
    "https://cdn.prod.website-files.com/5efefaa8fe53d9f878615f8c/5f3272fed0a119b6fb24f3b3_Arena-Aviation-Capital-Plane-Tail-AirAsia-Zest.png",
    "https://airhex.com/images/airline-logos/tail/vistara.png",
    "https://stafftraveler.com/img/airlines/tails/QP.png",
    "https://uploads-ssl.webflow.com/5efefaa8fe53d9f878615f8c/5f3272b479202e798c0d6037_Arena-Aviation-Capital-Plane-Tail-SpiceJet.png",
];

  return (
    <div className="pList">
      { loading ? ("loading"
        ) : (
        <>
        {data && 
           images.map((img,i) =>(

          <div className="pListItem" key={i}>
        <img
          src={img}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{data[i] ?.type}</h1>
           <h2>{data[i]?.count} Flights</h2>
        </div>
      </div>
        ))}
      
      </>
      )}
    </div>
  );
};


export default PropertyList;
