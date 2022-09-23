import React, { useState } from "react";
import "./cardMenuOption.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import ExecuterResult from "../executerResult/ExecuterResult";
import { useMutation, useQueryClient } from "react-query";

/**
 * This component represents an optin in the system. It could be:
 *  - A link to another page.
 *  - A call to an api that changes something in the system, in which case the api response
 *    is expected to return a map where the key is what changed and the change is either a
 *    count or other relevant information
 *  - A download link that calls the API to get a file
 * @param title The title of the option.
 * @param path Path of the page to go if the option is of type "link".
 * @param icon Icon to display.
 * @param type Type of the option: link, executableAction, download.
 * @returns
 */
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
  const queryClient = useQueryClient();

  const [executorIsActive, setExecutorIsActive] = useState(false);

  const mutation = useMutation(methodName, () => methodToExecute(), {
    onSuccess: () => {
      queryClient.invalidateQueries();
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
    } else if (type === "executableAction") {
      return <ExecutableActionContent />;
    } else if (type === "download") {
      return <DownloadContent />;
    }
  };

  function downloadThroughAnchorLink(downloadUrl) {
    const a = document.createElement("a");
    a.href = downloadUrl;
    // We provided a header called Content-Disposition so we dont need to set "a.download" here
    // a.download = fileName || 'download'
    a.click();
  }

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

  const DownloadContent = () => {
    return (
      <>
        <div className="icon">
          <div
            className="iconLink"
            onClick={() => downloadThroughAnchorLink(path)}
          >
            {icon}
          </div>
        </div>
        <div className="description">
          <div className="link" onClick={() => downloadThroughAnchorLink(path)}>
            <Button size="small">{description || "default"} </Button>
          </div>
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
