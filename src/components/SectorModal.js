import { useEffect, useRef, useState } from "react";

// SectorView component (child) -- sector pop-up view 
const SectorView = (props) => {
    // arrays of the different industries (checkboxes options)
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
    // arrays of the different industries & tags (search input)
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

    // states
    const [searchValue, setSerachValue] = useState("");
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const wrapperRef = useRef(null);
  

    // handles closing the search selection when clicking outside the pop up
    const handleClickOutside = (e) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
        setShowOptions(false);
      }
    };
    // handle the chosen input search value
    const handleSearchValue = (v) => {
      setSerachValue(v);
      setShowOptions(false);
    };
    // handles the chosen checkboxe/s value/s
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
    // handles the submit of the chosen inputs.
    const handleSubmit = (e) => {
      e.preventDefault();
      props.handleDisplay(false);
      console.log("form values", JSON.stringify(searchValue));
      console.log("form values", JSON.stringify(checkboxValues));
      props.handleSubmitedView(searchValue, checkboxValues);
    };
    
    // happens at render time.
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
        
    return (
    // sector-view ui
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

export default SectorView;
