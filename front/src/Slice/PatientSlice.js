import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: { listePatient: [] },
  reducers: {
    setListePatient: (state, action) => {
      state.listePatient = action.payload;
    },

    ajouterPatient: (state, action) => {
      state.listePatient.push(action.payload);
    },
    modifierPatient: (state, action) => {
      const { id, ...PatientModifie } = action.payload;
      const index = state.listePatient.findIndex(Patient => Patient.id === id);
      if (index !== -1) {
        state.listePatient[index] = { ...state.listePatient[index], ...PatientModifie };
      }
    },
    supprimerPatient: (state, action) => {
      const idASupprimer = action.payload;
      state.listePatient = state.listePatient.filter(Patient => Patient.id !== idASupprimer);
    },
  },
});

export const { setListePatient, ajouterPatient, modifierPatient, supprimerPatient } = patientSlice.actions;
export default patientSlice.reducer;
