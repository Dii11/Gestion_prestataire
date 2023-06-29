import { createSlice } from '@reduxjs/toolkit';

const traitementSlice = createSlice({
  name: 'traitement',
  initialState: { listeTraitement: [] },
  reducers: {
    setListeTraitement: (state, action) => {
      state.listeTraitement = action.payload;
    },
    ajouterTraitement: (state, action) => {
      state.listeTraitement.push(action.payload);
    },
    modifierTraitement: (state, action) => {
      const { id, ...TraitementModifie } = action.payload;
      const index = state.listeTraitement.findIndex(
        Traitement => Traitement.id === id
      );
      if (index !== -1) {
        state.listeTraitement[index] = {
          ...state.listeTraitement[index],
          ...TraitementModifie
        };
      }
    },
    supprimerTraitement: (state, action) => {
      const idASupprimer = action.payload;
      state.listeTraitement = state.listeTraitement.filter(
        Traitement => Traitement.id !== idASupprimer
      );
    },
  },
});

export const {
  setListeTraitement,
  ajouterTraitement,
  modifierTraitement,
  supprimerTraitement
} = traitementSlice.actions;
export default traitementSlice.reducer;
