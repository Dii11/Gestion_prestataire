import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ListePrestation = () => {
  const [listeMedecins, setListeMedecins] = useState([]);

  useEffect(() => {
    const fetchListePrestation = async () => {
      try {
        const response = await axios.get("http://localhost:3001/traitement");
        const traitements = response.data;

        // Calcul des prestations totales pour chaque médecin
        const medecins = traitements.reduce((acc, traitement) => {
          const { nomMedecin, tauxJournalier, nombreJour } = traitement.traitement;

          if (nomMedecin && tauxJournalier && nombreJour) {
            const prestationTotal = tauxJournalier * nombreJour;

            if (acc[nomMedecin]) {
              acc[nomMedecin] += prestationTotal;
            } else {
              acc[nomMedecin] = prestationTotal;
            }
          }

          return acc;
        }, {});

        // Conversion de l'objet en tableau
        const medecinsArray = Object.entries(medecins).map(([nomMedecin, prestationTotal]) => ({
          nomMedecin,
          prestationTotal,
        }));

        setListeMedecins(medecinsArray);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des prestations :", error);
      }
    };

    fetchListePrestation();
  }, []);

  return (
    <div className="liste-prestation">
   
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numéro médecin</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prestation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listeMedecins.map((medecin, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{medecin.nomMedecin}</TableCell>
                <TableCell>{medecin.prestationTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListePrestation;
