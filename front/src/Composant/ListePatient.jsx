import React, { useEffect, useState } from 'react';
import {TableContainer,Paper,Table,TableHead,TableRow,TableCell,TableBody, IconButton, Dialog, DialogTitle, DialogActions, Button, DialogContent }from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import { setListePatient, supprimerPatient} from '../Slice/PatientSlice';
import {Delete, Edit} from '@mui/icons-material';
import axios from 'axios';
import FormulairePatient from './FormulairePatient';
const ListeMedecin = () => {
const liste=useSelector((state)=>state.Patient.listePatient)
const dispatch=useDispatch();
const [dialogSuppressionOuvert, setDialogSuppressionOuvert] = useState(false);
const [id, setId] = useState("");
const [dialogModificationOuvert, setDialogModificationOuvert] = useState(false);
  const [idPatientSelectionne, setidPatientSelectionne] = useState(null);

useEffect(() => {
  const fetchListePatient=()=>{
    axios.get('http://localhost:3001/patient')
    .then((response)=>dispatch(setListePatient(response.data)))
   }
 fetchListePatient();
}, [dispatch]);

const supprimer = (id) => {
  setId(id);
  setDialogSuppressionOuvert(true);
};

const confirmerSuppression = () => {
  axios.delete(`http://localhost:3001/patient/${id}`).then(() => {
    setDialogSuppressionOuvert(false);
    dispatch(supprimerPatient(id));
 
  });
};

const modifier = (id) => {
  setidPatientSelectionne(id);
  setDialogModificationOuvert(true);
  
};

const fermerDialogModification = () => {
  setDialogModificationOuvert(false);
};

    return (
        <div className='liste'>
            <TableContainer component={Paper} elevation={6} sx={{height:"68vh",width:'82vw'}}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell >Nom</TableCell>
                    <TableCell >Adresse</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {liste.map((patient)=>{return(
                  <TableRow key={patient.id}>
                    <TableCell >{patient.id}</TableCell>
                    <TableCell >{patient.nom}</TableCell>
                    <TableCell >{patient.adresse}</TableCell>
                    <TableCell >
                    <IconButton color="success"  
                    onClick={()=>modifier(patient.id)}
                    ><Edit/></IconButton>
                   <IconButton color="error" onClick={()=>supprimer(patient.id)}><Delete/></IconButton>
                    </TableCell>
                  </TableRow>
                 )}) }
                  
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
        <DialogTitle>Modifier le patient</DialogTitle>
        <DialogContent>
          {idPatientSelectionne && (
            <FormulairePatient
              patientId={idPatientSelectionne}
              fermerDialog={fermerDialogModification}
            />
          )}
        </DialogContent>
      </Dialog>
        </div>
    );
};

export default ListeMedecin;