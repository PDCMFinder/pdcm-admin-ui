import { callGET } from "./restCaller";

/**
 * Get a summary of the loaded ontologies
 * @returns Json with counts by type and total records, as well as information about the loading
 * process.
 */
export async function getOntologySummary() {
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ontology/getSummary`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

/**
 * Loads the ontologies from OLS
 * @returns Information about the loading process.
 */
export async function loadOntologies() {
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ontology/loadOntologies`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export async function searchOntologies(input) {
    let result = {}

    if (input && input !== "") {
        const url = `${process.env.REACT_APP_API_URL}/api/ontology/search?input=${input}`
        return callGET(url)
    }

    return result;
}


