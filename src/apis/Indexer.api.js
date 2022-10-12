import { callPUT } from "./restCaller"

/**
 * Calls enpoint to index the rules and ontologies.
 */
export async function index() {
    const url = `${process.env.REACT_APP_API_URL}/api/indexer/index`
    return callPUT(url)
}

