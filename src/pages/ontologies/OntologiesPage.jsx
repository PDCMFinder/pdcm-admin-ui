import "./ontologiesPage.css";
import { getOntologySummary } from "../../apis/Ontologies.api";
import { useQuery } from "react-query";
import OntologySummaryReport from "../../components/ontology/ontologySummaryReport/OntologySummaryReport";
import OntologyLoader from "../../components/ontology/ontologyLoader/OntologyLoader";

const OntologiesPage = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "getOntologySummary",
    getOntologySummary
  );

  const handleOntologiesLoaded = (loaded) => {
    if (loaded) {
      refetch();
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="ontologiesPage">
      <div className="ontologiesPageTitle">Ontologies</div>
      <div className="ontologiesPageContent">
        PDCM Admin uses the Ontology Lookup Service (OLS) as the source for the
        ontologies that are used in the mappings. The following is the list of
        root nodes or branches fetched for each ontology type (diagnosis,
        treatment and regimen):
        <h3>Diagnosis:</h3>
        <ul>
          <li>
            {" "}
            <strong>Malignant Neoplasm:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C9305
          </li>
        </ul>
        <h3>Treatment:</h3>
        <ul>
          <li>
            {" "}
            <strong>Chemical Modifier Branch:</strong>
            http://purl.obolibrary.org/obo/NCIT_C1932
          </li>
          <li>
            <strong>Dietary Supplement branch:</strong>
            http://purl.obolibrary.org/obo/NCIT_C1505
          </li>
          <li>
            <strong>Drug or Chemical by Structure branch:</strong>
            http://purl.obolibrary.org/obo/NCIT_C1913
          </li>
          <li>
            <strong>Industrial Aid branch:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C45678
          </li>
          <li>
            <strong>Pharma Substance branch:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C1909
          </li>
          <li>
            <strong>Physiology branch:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C1899
          </li>
          <li>
            <strong>Hematopoietic Cell Transplantation branch:</strong>
            http://purl.obolibrary.org/obo/NCIT_C15431
          </li>
          <li>
            <strong>Therapeutic Procedure branch:</strong>
            http://purl.obolibrary.org/obo/NCIT_C49236
          </li>
          <li>
            <strong>Clinical Study branch:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C15206
          </li>
          <li>
            <strong>Gene Product branch:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C26548
          </li>
        </ul>
        <h3>Regimen:</h3>
        <ul>
          <li>
            {" "}
            <strong>Chemotherapy Regimen or Agent Combination:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C12218
          </li>
          <li>
            {" "}
            <strong>FOLFOX Regimen:</strong>{" "}
            http://purl.obolibrary.org/obo/NCIT_C11197
          </li>
        </ul>
        <div className="reloadingProcess">
          <h2>Reloading process</h2>
          The reloading process takes around 5 minutes to finish.
          <OntologySummaryReport {...data} />
          <div className="loader">
            <OntologyLoader onProcessFinished={handleOntologiesLoaded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OntologiesPage;
