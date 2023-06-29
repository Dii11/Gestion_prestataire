import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

const Header = ({ afficherFormulaire }) => {


  return (
    <div className='entete'>
      <TextField
        type='search'
        variant='standard'
        placeholder='Rechercher ici'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div className='bouton_filtre'>
        <Button variant='contained'>Tous</Button>
        <Button variant='outlined'>Alphabétique</Button>
      </div>
    </div>
  );
};

export default Header;
