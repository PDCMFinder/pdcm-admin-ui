import React from "react";
import { useParams } from "react-router";

const columns = [
  {
    field: "dataSource",
    headerName: "Data Source",
    width: 120,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "unmapped",
    headerName: "Unmapped terms",
    type: "number",
    width: 150,
  },
  { field: "mapped", headerName: "Mapped terms", type: "number", width: 150 },
  {
    field: "progress",
    headerName: "Progress",
    type: "number",
    width: 150,
  },
];

const Mappings = () => {
  let { statusList } = useParams();
  console.log(statusList);

  return <div className="mappings">Mappings {statusList}</div>;
};

export default Mappings;
