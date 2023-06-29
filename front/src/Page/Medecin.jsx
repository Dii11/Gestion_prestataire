
import ListeMedecin from "../Composant/ListeMedecin";
import FormulaireMedecin from "../Composant/FormulaireMedecin";
import Header from "../Composant/Header";

const Medecin = () => {
  return (
    <>
      <Header />
      <div className="contenu">
     <FormulaireMedecin/>
     <ListeMedecin/>
     </div>
    </>
  );
};

export default Medecin;
