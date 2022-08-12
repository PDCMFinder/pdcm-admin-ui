import { useLocation } from "react-router-dom";

const mappingKeyAttributes = ['dataSource', 'treatmentName', 'sampleDiagnosis', 'tumorType', 'originTissue'];

/**
 * Get mappings summary by entity type
 * @returns Status counts by provider for a specific entity type.
 */
export async function getMappingsSummary(entityTypeName) {
    console.log("called getMappingsSummary with", entityTypeName);
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/getSummary?entityTypeName=${entityTypeName}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export async function getMappingsWithFilters(type, dataSource, status, page, pageSize) {
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mappings/search?entityType=${type}&status=${status}&mq=DataSource:${dataSource}&size=${pageSize}&page=${page}`
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
    console.log("searchParameters", searchParameters);
    return searchParameters;
}

const buildQueryKeyAttribute = (key, values) => {
    console.log("key", key, "values", values);
    let query = "";
    for (const idx in values) {
        console.log("VALUE", values[idx]);
        query += "mq=" + key + ":" + values[idx] + "&";
    }
    return query;
}

export async function searchMappings(facetSelections, page, pageSize) {
    let searchParameters = buildSearchParameters(facetSelections);
    searchParameters += "&page=" + page;
    searchParameters += "&size=" + pageSize;
    const url = `${process.env.REACT_APP_API_URL}/api/mappings/search?${searchParameters}`
    console.log("url", url);
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
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
    console.log("!facetSelection", facetSelection);
    return [facetSelection];
}

// export function parseSelectedFacetFromUrl(
//     facetsByKey
//   ) {
//     const facetSidebarSelection= {};
//     Object.keys(facetsByKey).forEach((key) => {
//       const [sectionKey, facetKey] = compoundKey.split(".");
//       const urlFacetSelection = facetsByKey[key];
//       if (!facetSidebarSelection[sectionKey]) {
//         facetSidebarSelection[sectionKey] = {};
//       }
//       facetSidebarSelection[sectionKey][facetKey] = urlFacetSelection || [];
//     });
//     return facetSidebarSelection;
//   }
