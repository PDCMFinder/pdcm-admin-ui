import { callPOST } from "./restCaller"

/**
 * Calls enpoint to update the input data PDCM Admin needs.
 */
export async function updateInputData() {
    const url = `${process.env.REACT_APP_API_URL}/api/repository-sync`
    return callPOST(url)
}

