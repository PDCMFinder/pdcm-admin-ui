import { callGET } from "./restCaller";


export async function searchOntologies(input, entityTypeName) {
    let result = {}

    if (input && input !== "") {
        const url = `${process.env.REACT_APP_API_URL}/api/ontology/search?input=${input}&entityTypeName=${entityTypeName}`
        return callGET(url)
    }

    return result;
}


