import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {  setListeMedecin, supprimerMedecin } from '../Slice/MedecinSlice';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import FormulaireMedecin from './FormulaireMedecin';

const ListeMedecin = () => {
  const listeMedecin = useSelector((state) => state.medecin.liste);
  
  const dispatch = useDispatch();
  const [dialogSuppressionOuvert, setDialogSuppressionOuvert] = useState(false);
  const [dialogModificationOuvert, setDialogModificationOuvert] = useState(false);
  const [idMedecinSelectionne, setIdMedecinSelectionne] = useState(null);

  useEffect(() => {
    const fetchListeMedecin = () => {
      axios
        .get('http://localhost:3001/medecin')
        .then((response) => dispatch(setListeMedecin(response.data)));
    };
    fetchListeMedecin();
  }, [dispatch]);

  const supprimer = (id) => {
    setIdMedecinSelectionne(id);
    setDialogSuppressionOuvert(true);
  };

  const confirmerSuppression = () => {
    axios.delete(`http://localhost:3001/medecin/${idMedecinSelectionne}`).then(() => {
      setDialogSuppressionOuvert(false);
      dispatch(supprimerMedecin(idMedecinSelectionne));
    });
  };

  const modifier = (id) => {
    setIdMedecinSelectionne(id);
    setDialogModificationOuvert(true);
  };

  const fermerDialogModification = () => {
    setDialogModificationOuvert(false);
  };

  return (
    <div className="liste">
      <TableContainer component={Paper} elevation={6} sx={{ height: '68vh', width: '82vw' }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Taux journalier</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listeMedecin.map((medecin) => (
              <TableRow key={medecin.id}>
                <TableCell>{medecin.id}</TableCell>
                <TableCell>{medecin.nom}</TableCell>
                <TableCell>{medecin.tauxJournalier}</TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => modifier(medecin.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => supprimer(medecin.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogSuppressionOuvert} onClose={() => setDialogSuppressionOuvert(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir supprimer cet élément ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogSuppressionOuvert(false)}>Annuler</Button>
          <Button onClick={confirmerSuppression} color="error">
            Oui
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogModificationOuvert} onClose={fermerDialogModification}>
        <DialogTitle>Modifier le médecin</DialogTitle>
        <DialogContent>
          {idMedecinSelectionne && (
            <FormulaireMedecin
              medecinId={idMedecinSelectionne}
              fermerDialog={fermerDialogModification}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListeMedecin;
