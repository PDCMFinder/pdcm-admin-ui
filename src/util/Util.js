export const extractNCTiName = (url) => {
    let name = null;
    if (url) {
        const index = url.indexOf("NCIT");
        if (index > -1) {
            name = url.substring(index);
        }
    }

    return name;
};

export const convertToOLSUrl = (url) => {
    const ncit = extractNCTiName(url);
    return "https://www.ebi.ac.uk/ols/ontologies/ncit/terms?iri=http://purl.obolibrary.org/obo/" + ncit;
}

export const getValueByKey = (mappingValues, key) => {
    const found = mappingValues.find(element => element.mappingKey.key.toLowerCase() === key.toLowerCase());
    return found.value;
}

export const getSuggestionValueByKey = (mappingValues, key) => {
    console.log('f: ', mappingValues, key);
    const found = mappingValues.find(element => element.key.toLowerCase() === key.toLowerCase());
    return found.value;
}