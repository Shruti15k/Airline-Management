import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos} 
        alt="Flight"
        className="siImg"
      />
      <div className="siDesc">
      <div className="names">
      <span className="siType">{item.type}</span>
        <h1 className="siTitle">{item.name}</h1>
      </div>
       
        <div className="siDetails">
          <div className="siDeparture">
            <span className="siTime">{item.departtime}</span>
            <span className="siCity">{item.departcity}</span>
          </div>
          <div className="siDuration">
            <span>{item.duration}</span>
          </div>
          <div className="siArrival">
            <span className="siTime">{item.arrivetime}</span>
            <span className="siCity">{item.arrivecity}</span>
          </div>
        </div>
        {item.rating && <div className="siRatings">
          <span className="siRating">Ratings</span>
          <button className="siRatingButton">{item.rating}</button>
        </div>}
        <div className="siPrices">
          <span className="siPrice">₹{item.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
        </div>
        <Link to={`/flights/${item._id}`}>
        <button className="siSelectButton">Book</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
