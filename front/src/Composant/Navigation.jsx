import React from "react";
import { NavLink } from "react-router-dom";
import { Equalizer, Groups, LocalHospital, Money, VolunteerActivism } from "@mui/icons-material";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/">
        <Equalizer />
        <span>Tableau de bord</span>
      </NavLink>
      <NavLink to="/patient">
        <Groups />
        <span>Patient</span>
      </NavLink>
      <NavLink to="/medecin">
        <LocalHospital />
        <span>Médecin</span>
      </NavLink>
      <NavLink to="/traitement">
        <VolunteerActivism />
        <span>Traitement</span>
      </NavLink>
      <NavLink to="/prestation">
        < Money/>
        <span>Prestation</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
