const API_URL = process.env.REACT_APP_API_URL;

console.log('API_URL', API_URL);

export async function getOntologySummary() {
    let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ontology/getSummary`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}