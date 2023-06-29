import React, { useEffect, useState } from 'react';
import FormulaireTraitement from '../Composant/FormulaireTraitement';
import ListeTraitement from '../Composant/ListeTraitement'
import { TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setListeMedecin } from '../Slice/MedecinSlice';

const Traitement = () => {
  const dispatch = useDispatch();
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  useEffect(() => {
    const fetchListeMedecin = () => {
      axios
        .get('http://localhost:3001/medecin')
        .then((response) => dispatch(setListeMedecin(response.data)));
    };
    fetchListeMedecin();
  }, [dispatch]);

  return (
    <>
      <div className="contenu">
        <FormulaireTraitement />
        <div className="liste">
          <Typography variant="h6" color="primary">
            Listes des patients en traitement
          </Typography>
          <div>
            <Typography variant='h7' color="primary">filtrer entre 2 dates</Typography>
            <label>Date 1 :</label>
            <TextField
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              size='small'
            />
          </div>
          <div>
            <label>Date 2 :</label>
            <TextField
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              size='small'
            />
          </div>
        </div>
        <ListeTraitement date1={date1} date2={date2} />
      </div>
    </>
  );
};

export default Traitement;
