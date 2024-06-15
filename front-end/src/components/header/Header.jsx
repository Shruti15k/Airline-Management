import {
  faCalendarDays,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [returndestination, setreturnDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [returnDate, setReturnDate] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    passengers: 1,
    class: "Economy",
  });

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [specialFares, setSpecialFares] = useState("");

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  

  const handleDateChange = (item) => {
    const startDate = item.selection.startDate;
    const endDate = item.selection.endDate;
    setDate([item.selection]);
    if (startDate.getTime() === endDate.getTime()) {
      setReturnDate(null);
    } else {
      setReturnDate(endDate);
    }
  };

  const handleClassChange = (event) => {
    setOptions((prev) => ({
      ...prev,
      class: event.target.value,
    }));
  };

  const handleSpecialFaresChange = (fare) => {
    setSpecialFares(fare);
  };
  
  const {dispatch}= useContext(SearchContext);

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination,returndestination,date,returnDate, options}});
    navigate("/flights", { state: { destination,returndestination, date, returnDate, options, specialFares } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Book your next flight with ease.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free OurBooking account
            </p>
            {!user  && <button className="headerBtn">Sign in / Register</button>}
            <div className="Boxi">
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Delhi"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Guwahati"
                  className="headerSearchInput"
                  onChange={(e) => setreturnDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span className="headerSearchText">
                  {returnDate ? `${format(returnDate, "MM/dd/yyyy")}` : "Return Date"}
                </span>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faUser} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.passengers} passengers · ${options.class} `}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Passengers</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.passengers <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("passengers", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.passengers}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("passengers", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  
                    <div className="optionItem">
                      <span className="optionText">class</span>
                      <div className="optionCounter">
                      <select
                          value={options.class}
                          onChange={handleClassChange}
                          className="classSelect"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Business">Business</option>
                          <option value="Premium Economy">Premium Economy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            <div className="specialFaresContainer">
              <span className="specialFaresText">Special Fares (Optional):</span>
              <div className="specialFaresOptions">
                <button
                  className={`specialFareButton ${specialFares === "Student" ? "selected" : ""}`}
                  onClick={() => handleSpecialFaresChange("Student")}
                  data-tooltip="It is mandatory to present a valid Student ID at the time of check-in"
                >
                  Student
                </button>
                <button
                  className={`specialFareButton ${specialFares === "Senior Citizen" ? "selected" : ""}`}
                  onClick={() => handleSpecialFaresChange("Senior Citizen")}
                  data-tooltip="It is mandatory to present a valid date of birth proof at the time of check-in"
                >
                  Senior Citizen
                </button>
                <button
                  className={`specialFareButton ${specialFares === "Armed Forces" ? "selected" : ""}`}
                  onClick={() => handleSpecialFaresChange("Armed Forces")}
                  data-tooltip="It is mandatory to present a valid  Armed Forces ID at the time of check-in"
                >
                  Armed Forces
                </button>
              </div>
            </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
