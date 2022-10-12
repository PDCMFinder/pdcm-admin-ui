import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";

const ProcessSummary = ({ title, data, button }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(data).map((item) => {
            const key = item[0];
            const value = item[1];

            return (
              <Fragment key={key}>
                <Grid item xs={3}>
                  {key}:
                </Grid>
                <Grid item xs={9}>
                  {value}
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions>{button}</CardActions>
    </Card>
  );
};

export default ProcessSummary;
