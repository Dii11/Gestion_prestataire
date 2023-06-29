// FormulaireTraitement.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ajouterTraitement } from "../Slice/TraitementSlice";
import axios from "axios";
import { setListeMedecin } from "../Slice/MedecinSlice";
import { setListePatient } from "../Slice/PatientSlice";

const FormulaireTraitement = ({ onClose }) => {
  const [traitement, setTraitement] = useState({
    choixPatient: "",
    choixMedecin: "",
    nombreJour: "",
    montant: "",
    dateAjout: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const listePatients = useSelector((state) => state.Patient.listePatient);
  const listeMedecins = useSelector((state) => state.medecin.liste);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListeMedecin = () => {
      axios
        .get("http://localhost:3001/medecin")
        .then((response) => dispatch(setListeMedecin(response.data)));
    };
    const fetchListePatient = () => {
      axios
        .get("http://localhost:3001/patient")
        .then((response) => dispatch(setListePatient(response.data)));
    };
    fetchListePatient();
    fetchListeMedecin();
  }, [dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setTraitement((traitementRecent) => ({
      ...traitementRecent,
      [name]: value,
    }));
  };

  const ajouter = (e) => {
    e.preventDefault();
    if (
      traitement.choixMedecin &&
      traitement.choixPatient &&
      traitement.nombreJour &&
      traitement.dateAjout
    ) {
      const patientSelectionne = listePatients.find(
        (patient) => patient.id === traitement.choixPatient
      );
      const medecinSelectionne = listeMedecins.find(
        (medecin) => medecin.id === traitement.choixMedecin
      );
      traitement.montant=medecinSelectionne.tauxJournalier*traitement.nombreJour;
      const traitementAEnvoyer = {
        ...traitement,
        nomPatient: patientSelectionne.nom,
        adressePatient: patientSelectionne.adresse,
        nomMedecin: medecinSelectionne.nom,
        tauxJournalier:medecinSelectionne.tauxJournalier,
       
      };

      axios
        .post("http://localhost:3001/traitement", {
          traitement: traitementAEnvoyer,
        })
        .then((reponse) => {
          const nouvelId = reponse.data.id;
          dispatch(ajouterTraitement({id: nouvelId,...traitementAEnvoyer  }));

          setDialogTitle("Succès");
          setDialogContent(
            "Traitement enregistré avec succès ! Nouvel ID : " + nouvelId
          );
          setDialogOpen(true);
        });
      setTraitement({
        choixMedecin: "",
        choixPatient: "",
        nombreJour: 0,
        dateAjout: "",
        montant: "",
      });
    } else console.log("remplir tous les champs");
  };

  return (
    <div className="formulaire">
      <Typography variant="h6" color="textSecondary">
        Nouveau traitement
      </Typography>

      <form>
        <FormControl>
        <InputLabel
      >Choisir patient</InputLabel>
        <Select
          name="choixPatient"
         
          placeholder="Choix du patient"
          value={traitement.choixPatient}
          onChange={onChange}
          size="small"
         
        >
          {listePatients.map((patient) => (
            <MenuItem key={patient.id} value={patient.id}>
              {`${patient.nom} (${patient.id})`}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      <FormControl>
      <InputLabel
      >Choisir médecin</InputLabel> <Select
          name="choixMedecin"
          
          placeholder="Choix du médecin"
          value={traitement.choixMedecin}
          onChange={onChange}
          size="small"
        >
          {listeMedecins.map((medecin) => (
            <MenuItem key={medecin.id} value={medecin.id}>
              {`${medecin.nom} (${medecin.id})`}
            </MenuItem>
          ))}
        </Select></FormControl>
       
        <TextField
          name="nombreJour"
          placeholder="nombre de jour"
          value={traitement.nombreJour}
          onChange={onChange}
          size="small"
          type="number"
          error={traitement.nombreJour < 0}
          helperText={
            traitement.nombreJour < 0
              ? "le nombre de jour doit être supérieur à 0"
              : ""
          }
        />
      
        <TextField
          name="dateAjout"
          value={traitement.dateAjout}
          onChange={onChange}
          type="date"
          size="small"
        />
        <Button
          type="submit"
          onClick={ajouter}
          variant="contained"
          color="primary"
        >
          Ajouter
        </Button>
      </form>

      <Dialog open={dialogOpen}>
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

export default FormulaireTraitement;
