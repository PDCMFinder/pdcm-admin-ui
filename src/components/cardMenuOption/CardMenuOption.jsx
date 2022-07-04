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
      <div className="menuOption">
        <CardContent>
          <div className="menuOptionTitle">
            <Typography gutterBottom variant="h5" component="div">
              {title || "Default title"}
            </Typography>
          </div>
          <div className="icon">
            <Link className="iconLink" to={path}>
              {icon}
            </Link>
          </div>
          <div className="description">
            <Link className="link" to={path || "/"}>
              <Button size="small">{description || "default"} </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CardMenuOption;
