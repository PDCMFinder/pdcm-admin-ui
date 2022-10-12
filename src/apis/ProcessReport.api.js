import { callGET } from "./restCaller"

/**
 * Calls enpoint to get report of the module.
 */
export async function getReport(module) {
    const url = `${process.env.REACT_APP_API_URL}/api/processReport?module=${module}`
    return callGET(url)
}
