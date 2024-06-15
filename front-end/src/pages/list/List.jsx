import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch.js";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [returndestination, setreturnDestination] = useState(location.state.returndestination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [returnDate, setReturnDate] = useState(location.state.returnDate || null);
  const [options, setOptions] = useState(location.state.options);
  const [specialFares, setSpecialFares] = useState(location.state.specialFares);

  const {data, loading, error, reFetch} = useFetch(`/flights?departcity=${destination}&arrivecity=${returndestination}&departdate=${date[0].startDate}`)

    const handleOptionChange = (e) => {
      const { name, value } = e.target;
      setOptions((prev) => ({ ...prev, [name]: value }));
    };
    const handleSpecialFaresChange = (e) => {
      setSpecialFares(e.target.value);
    };
    return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Arrival</label>
              <input
                placeholder={returndestination}
                type="text"
                onChange={(e) => setreturnDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Depart Date</label>
              <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Return Date</label>
              <span
                onClick={() => setOpenReturnDate(!openReturnDate)}
                className="headerSearchText"
              >{returnDate ? `${format(returnDate[0].startDate, "MM/dd/yyyy")}` : "Select Date"}</span>
              {openReturnDate && (
                <DateRange
                  onChange={(item) => setReturnDate([item.selection])}
                  minDate={new Date()}
                  ranges={returnDate || [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                

                <div className="lsOptionItem">
                  <span className="lsOptionText">Passengers</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.passengers}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Class</span>
                  <select className="lsOptionInput" name="class" onChange={handleOptionChange} value={options.class}>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Special Fares</span>
                  <select className="lsOptionInput" name="specialFares" onChange={handleSpecialFaresChange} value={specialFares}>
                    <option value="student">Students</option>
                    <option value="armed">Armed Forces</option>
                    <option value="senior">Senior Citizen</option>
                  </select>
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" : <>
            {data.map(item=>(

            <SearchItem item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
