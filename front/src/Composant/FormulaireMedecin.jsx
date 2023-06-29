import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Typography } from '@mui/material';
import {  useDispatch } from 'react-redux';
import { ajouterMedecin, modifierMedecin } from '../Slice/MedecinSlice';

const FormulaireMedecin = ({ medecinId, fermerDialog }) => {
  const dispatch = useDispatch();
  const [medecin, setMedecin] = useState({ nom: '', tauxJournalier: 0 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  
  useEffect(() => {
    if (medecinId) {
      axios.get(`http://localhost:3001/medecin/${medecinId}`).then((response) => {
        setMedecin(response.data);
      });
    }
  }, [medecinId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedecin((prevMedecin) => ({
      ...prevMedecin,
      [name]: value,
    }));
  };

  const ajouter = (e) => {
    e.preventDefault();
    if (medecin.nom.trim() && medecin.tauxJournalier !== '') {
      if (medecinId) {
        axios.put(`http://localhost:3001/medecin/${medecinId}`, medecin).then((response) => {
          fermerDialog();
          dispatch(modifierMedecin(response.data))
        });
      } else {
        axios.post('http://localhost:3001/medecin', medecin).then((response) => {
          const nouvelId = response.data.id;
          dispatch(ajouterMedecin({ id: nouvelId, ...medecin }));
          setDialogTitle("Succès");
          setDialogContent(
            "Médecin ajouté avec succès ! Nouvel ID : " + nouvelId
          );
          setDialogOpen(true);
        });
      }
    }
  };

  return (
    <div className="formulaire">
      <Typography variant="h6" color="dimgrey">
        {medecinId ? 'Modifier le médecin' : 'Nouveau médecin'}
      </Typography>

      <form>
        <TextField
          name="nom"
          label="Nom"
          value={medecin.nom}
          onChange={handleChange}
          size="small"
        />
        <TextField
          name="tauxJournalier"
          label="Taux journalier"
          value={medecin.tauxJournalier}
          onChange={handleChange}
        
          size="small"
            error={
            medecin.tauxJournalier.length > 0 &&
         
              isNaN(medecin.tauxJournalier)
          }
          helperText={
            medecin.tauxJournalier.length > 0 &&
          
              isNaN(medecin.tauxJournalier)
              ? "Le champ ne doit contenir que des chiffres."
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                ar
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" onClick={ajouter} variant="contained" color="success">
          {medecinId ? 'Modifier' : 'Ajouter'}
        </Button>
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

export default FormulaireMedecin;
