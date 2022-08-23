import React, { useState } from "react";
import "./cardMenuOption.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import ExecuterResult from "../executerResult/ExecuterResult";
import { useMutation } from "react-query";

const CardMenuOption = ({
  title,
  description,
  path,
  icon,
  type,
  apiMethodToExecute,
}) => {
  const emptyFunction = () => void 0;
  const methodName = apiMethodToExecute?.name;
  const methodToExecute = apiMethodToExecute || emptyFunction;

  const [executorIsActive, setExecutorIsActive] = useState(false);

  const mutation = useMutation(methodName, () => methodToExecute(), {
    onSuccess: () => {
      // queryClient.invalidateQueries(["searchMappings"]);
      console.log("mutation successful");
    },
  });

  const handleOnExecutorClick = () => {
    setExecutorIsActive(true);
    mutation.mutate();
  };

  const handleOnClosed = () => {
    setExecutorIsActive(false);
  };

  const Content = () => {
    if (type === "link") {
      return <LinkContent />;
    } else {
      return <ExecutableActionContent />;
    }
  };

  const LinkContent = () => {
    return (
      <>
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
      </>
    );
  };

  const ExecutableActionContent = () => {
    return (
      <>
        <div className="icon">
          <div onClick={handleOnExecutorClick} className="iconLink">
            {icon}
          </div>
        </div>
        <div className="description">
          <Button size="small" onClick={handleOnExecutorClick}>
            {description || "default"}{" "}
          </Button>

          {executorIsActive && (
            <ExecuterResult
              active={executorIsActive}
              onHandleClosed={handleOnClosed}
              isLoading={mutation.isLoading}
              data={mutation.data}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <Card sx={{ maxWidth: 200, height: 250 }}>
      <div className="menuOption">
        <CardContent>
          <div className="menuOptionTitle">
            <Typography gutterBottom variant="h5" component="div">
              {title || "Default title"}
            </Typography>
          </div>
          <Content />
        </CardContent>
      </div>
    </Card>
  );
};

export default CardMenuOption;
