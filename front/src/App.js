import Navigation from "./Composant/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableauBord from "./Page/TableauBord";
import Medecin from "./Page/Medecin";
import Patient from "./Page/Patient";
import Traitement from "./Page/Traitement";
import Prestation from "./Page/Prestation.jsx";
function App() {
  return (
    <Router>
      <div className="ensemble">
        <Navigation />
        <div className="">
      
          <Routes>
            <Route exact path="/" element={<TableauBord />} />
            <Route path="/medecin" element={<Medecin />} />
            <Route path="/patient" element={<Patient />} />
           <Route path="/traitement" element={<Traitement />} />
           <Route path="/prestation" element={<Prestation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
