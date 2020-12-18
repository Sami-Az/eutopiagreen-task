import { useState } from "react";
import SectorView from "./components/SectorModal";
import "./App.css";


// App component (parent) - main view
const App = () => {
  // states
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [submittedInput, setsubmittedInput] = useState(null);
  const [submittedCheckbox, setsubmittedCheckbox] = useState([]);

  // handles pop up & button display
  const handleDisplay = (displayModal, displayButton) => {
    setShowModal(displayModal);
    setShowButton(displayButton);
  };

  // handles submited states (once 'Apply' clicked)
  const handleSubmitedView  = (searchOuput, checkboxOutput) => {
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
      {/* handledisplay & handleSubimtedView passed as props to the child component */}
      {showModal && <SectorView handleDisplay={handleDisplay} handleSubmitedView={handleSubmitedView} />}
      {/* printing users result */}
      {(submittedInput && submittedCheckbox) && (
        <div className="submitted_result">
          <h3>FILTER RESULTS</h3>
          <hr/>
          <h5>INDUSTRIES & TAGS:</h5>
          {submittedInput}
          <h5>INDUSTRIES:</h5>
          <ul>
            {submittedCheckbox.map(result => (
              <li>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;