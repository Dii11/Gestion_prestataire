import React, { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, FormControl, Typography } from "@mui/material";
import ListePrestation from "../Composant/ListePrestation";
import axios from "axios";

const Prestation = () => {
  const [annee, setAnnee] = useState("");
  const [total, setTotal] = useState(0);
  const [listeTraitement, setListeTraitement] = useState([]);
  const [anneesDisponibles, setAnneesDisponibles] = useState([]);

  useEffect(() => {
    const fetchListeTraitement = async () => {
      const response = await axios.get("http://localhost:3001/traitement");
      setListeTraitement(response.data);
      const years = response.data.map((item) => {
        const traitementYear = new Date(item.traitement?.dateAjout).getFullYear();
        return traitementYear;
      });
      const uniqueYears = [...new Set(years)];
      setAnneesDisponibles(uniqueYears);
    };
    fetchListeTraitement();
  }, []);

  const handleYearChange = (event) => {
    setAnnee(event.target.value);
    const year = event.target.value;
    const totalPrestations = listeTraitement.reduce((total, item) => {
      const traitement = item.traitement;
      const dateAjout = traitement?.dateAjout || "";
      const montant = traitement?.montant || 0;
      const traitementYear = new Date(dateAjout).getFullYear();
      if (year === "" || traitementYear === year) {
        return total + montant;
      }
      return total;
    }, 0);
    setTotal(totalPrestations);
  };

  return (
    <div className="prestation">
      <form>
        <FormControl>
          <InputLabel>Choisir une année :</InputLabel>
          <Select value={annee} onChange={handleYearChange}>
            <MenuItem value="">Toutes les années</MenuItem>
            {anneesDisponibles.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <div className="titre">
        <Typography variant="h6" color="primary">
          Etat des prestations en année {annee}
        </Typography>
        <Typography variant="h6" color="green">
          Total prestation = {total} ar
        </Typography>
      </div>
      <ListePrestation />
    </div>
  );
};

export default Prestation;
