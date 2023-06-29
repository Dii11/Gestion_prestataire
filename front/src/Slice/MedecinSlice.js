// MedecinSlice.js
import { createSlice } from '@reduxjs/toolkit';

const medecinSlice = createSlice({
  name: 'medecin',
  initialState: { liste: [] },
  reducers: {
    setListeMedecin: (state, action) => {
      state.liste = action.payload;
    },
    ajouterMedecin: (state, action) => {
      state.liste.push(action.payload);
    },
    modifierMedecin: (state, action) => {
      const { id, ...MedecinModifie } = action.payload;
      const index = state.liste.findIndex((Medecin) => Medecin.id === id);
      if (index !== -1) {
        state.liste[index] = { ...state.liste[index], ...MedecinModifie };
      }
    },
    supprimerMedecin: (state, action) => {
      const idASupprimer = action.payload;
      state.liste = state.liste.filter((Medecin) => Medecin.id !== idASupprimer);
    },
  },
});

export const { setListeMedecin, ajouterMedecin, modifierMedecin, supprimerMedecin } = medecinSlice.actions;
export default medecinSlice.reducer;
