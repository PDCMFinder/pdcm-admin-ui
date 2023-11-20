const baseUrl = `${process.env.REACT_APP_API_URL}/api/releases`;

/**
 * Get All Releases Summaries
 */
export async function getAllReleasesSummaries() {
    console.log('getAllReleasesSummaries');
    const settings = {
        method: 'GET',
    };
    let response = await fetch(
        `${baseUrl}/getAllReleasesSummaries`, settings
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json()
}