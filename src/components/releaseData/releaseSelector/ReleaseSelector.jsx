import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getReleases } from '../../../apis/Releases.api';


const ReleaseSelector = ({ onSelectionChange }) => {

    const { data } = useQuery(["releases"], () => getReleases());
    const [selectedRelease, setSelectedRelease] = useState('');

    // Maintain an initial state for selectedRelease. This value should only be set when 
    // there is valid data (data) and when selectedRelease hasn't been set yet.
    const initialSelectedRelease = data && data.length > 0 ? data[0].id : '';

    // Use the useEffect hook to set the initial value of selectedRelease and call onSelectionChange 
    // only when initialSelectedRelease is available.
    useEffect(() => {
        if (initialSelectedRelease) {
          setSelectedRelease(initialSelectedRelease);
          onSelectionChange(initialSelectedRelease);
        }
      }, [initialSelectedRelease, onSelectionChange]);

    const handleReleaseChange = (event) => {
        setSelectedRelease(event.target.value);
        onSelectionChange(event.target.value)
    };

    return (
        <div>
            {data &&
                <FormControl fullWidth>
                    <InputLabel>Release</InputLabel>
                    <Select value={selectedRelease} onChange={handleReleaseChange}>
                        {
                            data.map((release) => (
                                <MenuItem key={release.id} value={release.id}>
                                    {release.name} ({new Date(release.date).toLocaleDateString()})
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            }

        </div>
    );
}

export default ReleaseSelector