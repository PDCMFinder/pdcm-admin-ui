import "./ontologiesPage.css";
import { useQuery } from "react-query";
import OntologySummaryReport from "../../components/ontology/ontologySummaryReport/OntologySummaryReport";
import OntologyLoader from "../../components/ontology/ontologyLoader/OntologyLoader";
import { getReport } from "../../apis/ProcessReport.api";

const OntologiesPage = () => {
  const moduleName = "Ontologies";

  const processReportQuery = useQuery(["getReport", moduleName], () =>
    getReport(moduleName)
  );

  const handleOntologiesLoaded = (loaded) => {
    if (loaded) {
      processReportQuery.refetch();
    }
  };

  if (processReportQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (processReportQuery.error) {
    return <span>Error: {processReportQuery.error.message}</span>;
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
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C9305"
                target="_blank"
                rel="noreferrer"
              >
                Malignant Neoplasm
              </a>
            </strong>{" "}
          </li>
          <li>
            {" "}
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C3262"
                target="_blank"
                rel="noreferrer"
              >
                Neoplasm
              </a>
            </strong>{" "}
          </li>
          <li>
            {" "}
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C35814"
                target="_blank"
                rel="noreferrer"
              >
                Hematopoietic and Lymphoid System Disorder
              </a>
            </strong>{" "}
          </li>
        </ul>
        <h3>Treatment:</h3>
        <ul>
          <li>
            {" "}
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C1932"
                target="_blank"
                rel="noreferrer"
              >
                Chemical Modifier
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C1505"
                target="_blank"
                rel="noreferrer"
              >
                Dietary Supplement
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C1913"
                target="_blank"
                rel="noreferrer"
              >
                Drug or Chemical by Structure
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C45678"
                target="_blank"
                rel="noreferrer"
              >
                Industrial Aid
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C1909"
                target="_blank"
                rel="noreferrer"
              >
                Pharmacologic Substance
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C1899"
                target="_blank"
                rel="noreferrer"
              >
                Physiology-Regulatory Factor
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C15431"
                target="_blank"
                rel="noreferrer"
              >
                Hematopoietic Cell Transplantation
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C49236"
                target="_blank"
                rel="noreferrer"
              >
                Therapeutic Procedure
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C15206"
                target="_blank"
                rel="noreferrer"
              >
                Clinical Study
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C26548"
                target="_blank"
                rel="noreferrer"
              >
                Gene Product
              </a>
            </strong>
          </li>
        </ul>
        <h3>Regimen:</h3>
        <ul>
          <li>
            {" "}
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C12218"
                target="_blank"
                rel="noreferrer"
              >
                Chemotherapy Regimen or Agent Combination
              </a>
            </strong>
          </li>
          <li>
            {" "}
            <strong>
              <a
                href="https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/NCIT_C11197"
                target="_blank"
                rel="noreferrer"
              >
                FOLFOX Regimen
              </a>
            </strong>
          </li>
        </ul>
        <div className="reloadingProcess">
          <h2>Reloading process</h2>
          The reloading process takes around 5 minutes to finish.
          <OntologySummaryReport data={processReportQuery.data} />
          <div className="loader">
            <OntologyLoader onProcessFinished={handleOntologiesLoaded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OntologiesPage;
