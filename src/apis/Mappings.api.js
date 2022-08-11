import { useLocation } from "react-router-dom";

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

export async function searchMappings(facetSelections, page, pageSize) {
    let query = "";
    if (facetSelections) {
        for (let key in facetSelections) {
            query += key + "=" + facetSelections[key].join(",") + "&"
        }
    }
    console.log("query so far[1]", query);
    query += "&page=" + page;
    query += "&size=" + pageSize;
    console.log("query so far[2]", query);
    const url = `${process.env.REACT_APP_API_URL}/api/mappings/search?${query}`
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
        const [key, value] = element;
        if (!facetSelection[key]) {
            facetSelection[key] = [value]
        } else {
            facetSelection[key].push(value)
        }
    }
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
