import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query';
import { getAllTreatmentsAndDiagnosis } from '../../apis/Mappings.api';
  

const SearchBox = ({onSearchBoxSelectionChange}) => {

    const { data } = useQuery(
        ["allTreatmentsAndDiagnosis"],
        () => getAllTreatmentsAndDiagnosis()
      );

    const listOfTreatmentdAndDiagnosis = data? data : [];

  return (
    <div>
        <Autocomplete
        id="search-box"
        freeSolo
        options={listOfTreatmentdAndDiagnosis}
        renderInput={(params) => <TextField {...params} label="Diagnosis or Treatment name" />}
        onChange={(e, v) => {
            if (onSearchBoxSelectionChange) onSearchBoxSelectionChange(e, v);
          }}
      />
    </div>
  )
}

export default SearchBox