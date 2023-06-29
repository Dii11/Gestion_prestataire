import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setListeTraitement,
  supprimerTraitement,
} from "../Slice/TraitementSlice";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const ListeTraitement = ({ date1, date2 }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState("");
  const listeTraitement = useSelector(
    (state) => state.traitement.listeTraitement
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchListeTraitement = async () => {
      const response = await axios.get("http://localhost:3001/traitement");
      dispatch(setListeTraitement(response.data));
    };
    fetchListeTraitement();
  }, [dispatch]);

  const supprimer = (id) => {
    setId(id);
    setDialogOpen(true);
  };

  const confirmerSuppression = () => {
    axios.delete(`http://localhost:3001/traitement/${id}`).then(() => {
      setDialogOpen(false);
      dispatch(supprimerTraitement(id));
    });
  };

  // Filtrer la liste par médecin et dates
  const traitementsParMedecin = listeTraitement.reduce((acc, item) => {
    const traitement = item.traitement;
    const medecin = traitement?.nomMedecin || "";
    const dateAjout = traitement?.dateAjout || "";
    if (!acc[medecin]) {
      acc[medecin] = [];
    }
    if (date1 && date2) {
      if (dateAjout >= date1 && dateAjout <= date2) {
        acc[medecin].push(item);
      }
    } else {
      acc[medecin].push(item);
    }
    return acc;
  }, {});

  return (
    <div className="liste">
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ height: "66vh", width: "82vw" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nom médecin</TableCell>
              <TableCell>N° patient</TableCell>
              <TableCell>Nom patient</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Début du traitement</TableCell>
              <TableCell>Nombre de jours</TableCell>
              <TableCell>Taux Journalier</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(traitementsParMedecin).map(
              ([medecin, traitements], index) =>
                traitements.map((item, itemIndex) => {
                  const traitement = item.traitement;
                  return (
                    <TableRow key={item.id}>
                      {itemIndex === 0 ? (
                        <TableCell rowSpan={traitements.length}>
                          {traitement?.nomMedecin || ""}
                        </TableCell>
                      ) : null}
                      <TableCell>
                        Pat_{traitement?.choixPatient || ""}
                      </TableCell>
                      <TableCell>{traitement?.nomPatient || ""}</TableCell>
                      <TableCell>
                        {traitement?.adressePatient || ""}
                      </TableCell>
                      <TableCell>{traitement?.dateAjout || ""}</TableCell>
                      <TableCell>
                        {traitement?.nombreJour || ""}
                      </TableCell>
                      <TableCell>
                        {traitement?.tauxJournalier || ""}
                      </TableCell>
                      <TableCell>{traitement?.montant || ""}</TableCell>
                      <TableCell>
                        <IconButton>
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => supprimer(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cet élément ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={() => confirmerSuppression()} color="error">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListeTraitement;
