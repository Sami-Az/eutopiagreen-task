import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [submittedInput, setsubmittedInput] = useState(null);
  const [submittedCheckbox, setsubmittedCheckbox] = useState([]);

  const handleDisplay = (displayModal, displayButton) => {
    setShowModal(displayModal);
    setShowButton(displayButton);
  };
  const handledSubmitedView  = (searchOuput, checkboxOutput) => {
    setsubmittedInput(searchOuput);
    setsubmittedCheckbox(checkboxOutput);
  }

  return (
    <div className="main">
      {showButton && (
        <button
          className="advanced_filter_button"
          onClick={() => handleDisplay(!showModal, false)}
        >
          Advanced Filter
        </button>
      )}
      {showModal && <ModalView handleDisplay={handleDisplay} handledSubmitedView={handledSubmitedView} />}
      {(submittedInput && submittedCheckbox) && (
        <div className="submitted_result">
          <h3>Filter results</h3>
          <hr/>
          <h5>INDUSTRIES & TAGS:</h5>
          {submittedInput}
          <ul>
            <h5>INDUSTRIES:</h5>
            {submittedCheckbox.map(result => (
              <li>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const ModalView = (props) => {
  const industriesListOne = [
    "Agriculture",
    "Building",
    "Construction",
    "Energy",
    "Financial Services",
  ];
  const industriesListTwo = [
    "Food & baverage",
    "Forestry",
    "Healthcare",
    "Logistic",
    "Manufactoring",
  ];
  const industriesListThree = [
    "Mining",
    "Public admnistration",
    "Transportation",
    "Utilities(electricity, water, waste)",
  ];
  const searchOptions = [
    "3d printing",
    "Advanced materials",
    "Advanced metering",
    "Air vehicles",
    "Air-to-water",
    "Algae",
    "Packaging",
    "Alternative proteins",
    "Animal farming",
    "Animal welfare",
    "Apiculture",
    "Apps",
    "Aquaculture",
    "Artificial intelligence (AI)",
    "Automotive",
    "Autonomous vehicles",
    "Aviation",
    "Banking",
  ];
  const [searchValue, setSerachValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setShowOptions(false);
    }
  };
  const handleSearchValue = (v) => {
    setSerachValue(v);
    setShowOptions(false);
  };
  const handleCheckboxValues = (item) => {
    if (!checkboxValues.includes(item)) {
      setCheckboxValues((state) => [...state, item]);
    } else {
      setCheckboxValues((state) => {
        const filter = state.filter((value) => value !== item);
        return filter;
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleDisplay(false);
    console.log("form values", JSON.stringify(searchValue));
    console.log("form values", JSON.stringify(checkboxValues));
    props.handledSubmitedView(searchValue, checkboxValues);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="modal_view">
      <form onSubmit={handleSubmit}>
        <div className="modal_header">
          <div>OVERVIEW</div>
          <div className="sector">SECTOR</div>
          <div>CLIMAT IMPACT</div>
          <div>FINANCIALS</div>
          <div>WILDCARD</div>
        </div>
        <div className="modal_body">
          <div className="industries_tags">
            <h3>INDUSTRIES & TAGS</h3>
            <hr></hr>
          </div>
          <input
            onClick={() => setShowOptions(!showOptions)}
            type="text"
            placeholder="Type to search"
            value={searchValue}
            onChange={(e) => setSerachValue(e.target.value)}
          />
          {showOptions && (
            <div className="options_container">
              {searchOptions
                .filter(
                  (value) => value.indexOf(searchValue.toLowerCase()) > -1
                )
                .map((value) => (
                  <div
                    onClick={() => handleSearchValue(value)}
                    className="search_option"
                  >
                    {value}
                  </div>
                ))}
            </div>
          )}
          <div className="industries">
            <div className="industries_headlines">
              <h4>INDUSTRIES</h4>
              <hr></hr>
            </div>
            <div className="checkboxes">
              <div>
                {industriesListOne.map((item) => (
                  <div className="checkbox_item">
                    <input
                      type="checkbox"
                      onClick={() => handleCheckboxValues(item)}
                      checked={checkboxValues.includes(item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
              <div>
                {industriesListTwo.map((item) => (
                  <div className="checkbox_item">
                    <input
                      type="checkbox"
                      onClick={() => handleCheckboxValues(item)}
                      checked={checkboxValues.includes(item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
              <div>
                {industriesListThree.map((item) => (
                  <div className="checkbox_item">
                    <input
                      type="checkbox"
                      onClick={() => handleCheckboxValues(item)}
                      checked={checkboxValues.includes(item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer_section">
          <hr></hr>
          <div className="footer_buttons">
            <button className="apply_button" type="submit">
              APPLY
            </button>
            <button className="clearAll_button">CLEAR ALL</button>
            <button
              onClick={() => props.handleDisplay(false, true)}
              className="cancel_button"
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default App;