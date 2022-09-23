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

export const getValueByKey = (mappingValues, key) => {
    const found = mappingValues.find(element => element.mappingKey.key.toLowerCase() === key.toLowerCase());
    return found.value;
}

export const getSuggestionValueByKey = (mappingValues, key) => {
    console.log('f: ', mappingValues, key);
    const found = mappingValues.find(element => element.key.toLowerCase() === key.toLowerCase());
    return found.value;
}