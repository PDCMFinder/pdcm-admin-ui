import React from "react";
import "./cardMenuOption.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

const CardMenuOption = ({ title, description, path, icon }) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <div className="menuOption">
          <Typography gutterBottom variant="h5" component="div">
            {title || "Default title"}
          </Typography>
          <Link className="iconLink" to={path}>
            {icon}
          </Link>
          <Link className="link" to={path || "/"}>
            <Button size="small">{description || "default"} </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardMenuOption;
