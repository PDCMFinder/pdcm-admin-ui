const baseUrl = `${process.env.REACT_APP_API_URL}/api/releases`;
/**
 * Gets a list of the releases processed in the ETL.
 * @returns Sorted list of releases. A release has an id, a name and a date.
 */
export async function getReleases() {

    const url = `${process.env.REACT_APP_API_URL}/api/releases`
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export async function getModelsByViewAndRelease(viewName, releaseId, facetSelections, page, pageSize) {
    let searchParameters = buildParameters(facetSelections);
    searchParameters += "page=" + page;
    searchParameters += "&size=" + pageSize;

    const viewNameParameter = viewName ?? 'allModels';
    const releaseIdParameter = releaseId ?? '';
    const url = baseUrl + `/models/search/${releaseIdParameter}?viewName=${viewNameParameter}&${searchParameters}`;

    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}

export function buildParameters(facetSelections) {
    let searchParameters = "";

    if (facetSelections) {
        for (let key in facetSelections) {
            searchParameters += key + "=" + facetSelections[key].join(",") + "&"
        }
    }
    return searchParameters;
}