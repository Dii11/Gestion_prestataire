import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography }  from "@mui/material";

import { ajouterPatient, modifierPatient } from "../Slice/PatientSlice";
import { useDispatch } from "react-redux";
const FormulairePatient = ({ patientId,fermerDialog }) => {
  const dispatch=useDispatch();
  const [Patient, setPatient] = useState({
    nom: "",
    adresse: "",

  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const onChange = (e) => {
    const { name, value } = e.target;
    setPatient((PatientRecent) => ({
      ...PatientRecent,
      [name]: value,
    }));

  };

  
  useEffect(() => {
    if (patientId) {
      axios.get(`http://localhost:3001/patient/${patientId}`).then((response) => {
        setPatient(response.data);
      });
    }
  }, [patientId]);
  


  const ajouter = (e) => {
    e.preventDefault();
    if (Patient.nom.trim() && Patient.adresse !== '') {
      if (patientId) {
        axios.put(`http://localhost:3001/patient/${patientId}`, Patient).then((response) => {
          fermerDialog();
          dispatch(modifierPatient(response.data))
        });
      } else {
        axios.post('http://localhost:3001/patient', Patient).then((response) => {
          const nouvelId = response.data.id;
          dispatch(ajouterPatient({ id: nouvelId, ...Patient }));
          setDialogTitle("Succès");
          setDialogContent(
            "Patient ajouté avec succès ! Nouvel ID : " + nouvelId
          );
          setDialogOpen(true);
        });
      }
    }
  };

  return (
    <div className="formulaire">
    <Typography variant="h6" color="dimgrey">
        {patientId ? 'Modifier le patient' : 'Nouveau patient'}
      </Typography>
      <form>
        <TextField
          name="nom"
          label="Nom"
          value={Patient.nom}
          onChange={onChange}
          size="small"
        />
        <TextField
          name="adresse"
          label="adresse"
          value={Patient.adresse}
          onChange={onChange}
      
              size="small"
            
        />
        <Button type="submit" onClick={ajouter} variant="contained" color="success">ajouter</Button>
         </form>
 
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormulairePatient;
