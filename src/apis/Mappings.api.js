import { useLocation } from "react-router-dom";
import { callPOST } from "./restCaller";

const mappingKeyAttributes = ['dataSource', 'treatmentName', 'sampleDiagnosis', 'tumorType', 'originTissue'];

/**
 * Get mappings summary by entity type
 * @returns Status counts by provider for a specific entity type.
 */
export async function getMappingsSummary(entityTypeName) {
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/reports/getSummary?entityTypeName=${entityTypeName}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}


export function buildSearchParameters(facetSelections) {
    let searchParameters = "";

    if (facetSelections) {
        for (let key in facetSelections) {
            if (mappingKeyAttributes.includes(key)) {
                searchParameters += buildQueryKeyAttribute(key, facetSelections[key])
            } else {
                searchParameters += key + "=" + facetSelections[key].join(",") + "&"
            }

        }
    }
    return searchParameters;
}

const buildQueryKeyAttribute = (key, values) => {
    let query = "";
    for (const idx in values) {
        query += "mq=" + key + ":" + values[idx] + "&";
    }
    return query;
}


export async function searchMappings(facetSelections, page, pageSize) {
    let searchParameters = buildSearchParameters(facetSelections);
    searchParameters += "&page=" + page;
    searchParameters += "&size=" + pageSize;
    searchParameters += "&sort=dateUpdated,desc";

    const url = `${process.env.REACT_APP_API_URL}/api/mappings/search?${searchParameters}`
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export async function getCountsByStatusWithFilter(facetSelections) {
    let searchParameters = buildSearchParameters(facetSelections);

    const url = `${process.env.REACT_APP_API_URL}/api/mappings/statusCounts?${searchParameters}`
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export async function getMappingEntitySuggestions(mappingEntityId) {
    const url = `${process.env.REACT_APP_API_URL}/api/mappings/${mappingEntityId}/suggestions`
    return callPOST(url)
}

export async function updateEntity(mappingEntity) {
    const url = `${process.env.REACT_APP_API_URL}/api/mappings/${mappingEntity.id}`
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappingEntity)
    };
    let response = await fetch(url, settings);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

/**
 * Detects new mappings by reading treatment and diagnosis data from the providers
 * @returns Counts by entity type.
 */
export async function detectNewMappings() {
    const settings = {
        method: 'PUT',
    };
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/detectNewMappings`, settings
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

/**
 * Assigns mappings in an automatic way
 * @returns Counts by mapping type
 */
export async function assignAutomaticMappings() {
    const settings = {
        method: 'PUT',
    };
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/assignAutomaticMappings`, settings
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

/**
 * Reload mappings from the JSON rules
 */
export async function reloadMappingsFromJsonFiles() {
    const settings = {
        method: 'PUT',
    };
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/rules/restoreMappedMappingEntitiesFromJsons`, settings
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

/**
 * Gets the url of the endpoint that returns a zip with the json mapping files 
 * for treatment and diagnosis.
 * @returns endpoint's url.
 */
export function getDownloadMappingRulesUrl() {
    return `${process.env.REACT_APP_API_URL}/api/mappings/rules/mappingRules`;
}


export function useQueryParams() {
    const search = new URLSearchParams(useLocation().search);

    let facetSelection = {};
    for (const element of search) {
        let [key, value] = element;
        if (key === 'mq') {
            let data = value.split(':');
            key = data[0]
            value = data[1]
        }
        if (!facetSelection[key]) {
            facetSelection[key] = [value]
        } else {
            facetSelection[key].push(value)
        }
    }
    // If nothing selected, by default show unmapped terms
    if (Object.keys(facetSelection).length === 0) {
        facetSelection = { status: ["unmapped"] }
    }
    return [facetSelection];
}

export async function getAllTreatmentsAndDiagnosis() {

    const url = `${process.env.REACT_APP_API_URL}/api/mappings/treatmentsAndDiagnosis`
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}
