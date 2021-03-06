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
