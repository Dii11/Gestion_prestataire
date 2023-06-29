import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Icon,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@mui/material";
import { MedicalServices, Person, WorkspacePremium } from '@mui/icons-material';
import Chart from "../Composant/Chart";
import axios from "axios";

const TableauBord = () => {
  const [effectifMedecins, setEffectifMedecins] = useState(0);
  const [effectifPatients, setEffectifPatients] = useState(0);
  const [totalPrestations, setTotalPrestations] = useState(0);
  const [meilleursMedecins, setMeilleursMedecins] = useState([]);

  useEffect(() => {
    const fetchEffectifMedecins = async () => {
      const response = await axios.get("http://localhost:3001/medecin");
      setEffectifMedecins(response.data.length);
    };

    const fetchEffectifPatients = async () => {
      const response = await axios.get("http://localhost:3001/patient");
      setEffectifPatients(response.data.length);
    };

    const fetchTotalPrestations = async () => {
      const response = await axios.get("http://localhost:3001/traitement");
      const prestations = response.data;

      // Regrouper les prestations par médecin et calculer la somme des montants
      const montantsMedecins = {};
      prestations.forEach((prestation) => {
        const medecinId = prestation.medecinId;
        const montant = prestation.montant;
        if (!montantsMedecins[medecinId]) {
          montantsMedecins[medecinId] = 0;
        }
        montantsMedecins[medecinId] += montant;
      });

      // Convertir le dictionnaire en tableau d'objets
      const meilleursMedecins = Object.entries(montantsMedecins).map(([medecinId, montant]) => ({
        medecinId,
        montant
      }));

      // Trier les médecins en fonction des montants des prestations (du plus élevé au plus bas)
      meilleursMedecins.sort((a, b) => b.montant - a.montant);

      setTotalPrestations(meilleursMedecins.reduce((total, medecin) => total + medecin.montant, 0));
      setMeilleursMedecins(meilleursMedecins.slice(0, 10));
    };

    fetchEffectifMedecins();
    fetchEffectifPatients();
    fetchTotalPrestations();
  }, []);

  return (
    <div className="contenu">
      <div className="ensemble_chart">
        <div className="ensemble_total">
          <Paper variant="outlined" elevation={4} sx={{width:"28vw",height:"30vh",padding:"5%",backgroundColor:"rgba(181, 180, 180, 0.266)"}}>
            <Typography variant="h6" color="blueviolet">
              <Icon><Person/></Icon>  Effectif des patients:
            </Typography>
            <Icon></Icon>
            <Typography variant="h6" color="green">
              {effectifPatients} personnes
            </Typography>
          </Paper>
          <Paper variant="outlined" elevation={4} sx={{width:"29vw",height:"30vh",padding:"5%",backgroundColor:"rgba(181, 180, 180, 0.266)"}}>
            <Typography variant="h6" color="blueviolet">
              <Icon><MedicalServices/></Icon> Effectif des médecins:
            </Typography>
            <Icon></Icon>
            <Typography variant="h6" color="green">
              {effectifMedecins} personnes
            </Typography>
          </Paper>
        </div>

        <Paper
          variant="elevation"
          elevation={3}
          sx={{
            height: "30vh",
            width: "30%",
            background:
              "linear-gradient(to bottom , rgba(2,0,36,1) , rgba(1,1,59,1) 41%, rgb(8, 79, 93) )",
            padding: "5%",
          }}
        >
          <Typography variant="h6" color="lightblue">
            Total prestataire
          </Typography>
          <Icon></Icon>
          <Typography variant="h5" color="salmon">
            {totalPrestations} ar
          </Typography>
        </Paper>
      </div>
      <div className="ensemble_chart">
        <Paper
          variant="elevation"
          elevation={3}
          sx={{ height: "60vh", width: "70%", padding: "5%" }}
        >
          <Chart />
        </Paper>
        <Paper
          variant="elevation"
          elevation={3}
          sx={{ height: "60vh", width: "30%", padding: "2%" }}
        >
          <Typography variant="h6" color="secondary">
            <Icon><WorkspacePremium/></Icon>
            10 meilleurs prestataires
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N°</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Montant</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meilleursMedecins.map((medecin, index) => (
                  <TableRow key={medecin.medecinId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{medecin.medecinId}</TableCell>
                    <TableCell>{medecin.montant} ar</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default TableauBord;
