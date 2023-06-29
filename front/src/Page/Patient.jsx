import React from 'react';
import FormulairePatient from '../Composant/FormulairePatient';
import ListePatient from '../Composant/ListePatient';
import Header from '../Composant/Header';
const Patient = () => {
    return (
        <>
      <Header />
      <div className="contenu">
     <FormulairePatient/>
     <ListePatient/>
     </div>
    </>
    );
};

export default Patient;