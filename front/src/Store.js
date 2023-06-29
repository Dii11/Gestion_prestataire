import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './Slice/PatientSlice';
import medecinReducer from './Slice/MedecinSlice';
import traitementReducer from './Slice/TraitementSlice';

const store = configureStore({
  reducer: {
    Patient: patientReducer,
    medecin: medecinReducer,
    traitement: traitementReducer
  },
});

export default store;
