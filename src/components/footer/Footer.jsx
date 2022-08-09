import { Typography } from "@mui/material";
import React from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function Footer() {
  return (
    <div>
      <Copyright sx={{ pt: 4 }} />
    </div>
  );
}

export default Footer;
