import React from 'react'
import { faChild, faList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Typography } from '@mui/material';
import CardMenuOption from '../../components/cardMenuOption/CardMenuOption';
import { loadCurrentReleaseData } from '../../apis/Releases.api';

const options = [
  {
    id: 1,
    title: "Models By Release",
    description: "See models",
    icon: <FontAwesomeIcon className="fa-5x" icon={faList} />,
    path: "/all-models-by-release",
    type: "link",
    enabled: true,
  },
  {
    id: 2,
    title: "Paediatric Models",
    description: "See models",
    icon: <FontAwesomeIcon className="fa-5x" icon={faChild} />,
    path: "/paediatric-models-by-release",
    type: "link",
    enabled: true,
  },
  {
    id: 3,
    title: "Load Current Release Data",
    description: "Load",
    icon: <FontAwesomeIcon className="fa-5x" icon={faSpinner} />,
    type: "executableAction",
    enabled: true,
    apiMethodToExecute: loadCurrentReleaseData,
  }
];

const ReleaseDataOptions = props => {
  return (
    <div
      style={{
        textAlign: "center",
        marginLeft: "50px",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Typography variant="h4" component="h2">
          Release Data
        </Typography>

        <Grid
          marginLeft={"200px"}
          marginTop={"20px"}
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {options.map((option) => {
            return (
              <Grid key={option.id} item xs={4}>
                <CardMenuOption key={option.id} {...option} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

ReleaseDataOptions.propTypes = {}

export default ReleaseDataOptions