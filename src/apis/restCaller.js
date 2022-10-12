/**
 * This class offer methods to call the rest API and manage the possible errors
 */

export async function callGET(url) {
    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    return processCall(url, settings)
}

/**
 * Executes POST call. This method asumes there will be a response with JSON format!
 * @param {*} url Url to call
 * @param {*} body Body of the request. Can be null
 * @returns response.
 */
export async function callPOST(url, body = null) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await fetch(url, {
            method: settings.method,
            body,
            headers: settings.headers
        });

        if (res.ok) {
            return await (res.json());
        }
        const err = await res.json();
        handleApiError(err)
    } catch (err) {
        handleGeneralError(err)
    }
}

/**
 * Executes PUT call. This method asumes there will be a response with JSON format!
 * @param {*} url Url to call
 * @param {*} body Body of the request. Can be null
 * @returns response.
 */
export async function callPUT(url, body = null) {
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await fetch(url, {
            method: settings.method,
            body,
            headers: settings.headers
        });

        if (res.ok) {
            return await (res.json());
        }
        const err = await res.json();
        handleApiError(err)
    } catch (err) {
        handleGeneralError(err)
    }
}

async function processCall(url, settings, body = null) {
    try {
        const res = await fetch(url, {
            method: settings.method,
            body,
            headers: settings.headers
        });

        if (res.ok) {
            return await (res.json());
        }
        const err = await res.json();
        handleApiError(err)
    } catch (err) {
        handleGeneralError(err)
    }
}

function handleApiError(err) {

    let errorMessage = "Error calling the API";

    // Error is formatted as apierror
    if (err.apierror) {
        const { message, debugMessage } = err.apierror;
        errorMessage = message;
        if (debugMessage)
            errorMessage += "." + debugMessage
    }

    throw new Error(errorMessage);
}

function handleGeneralError(err) {
    let errorMessage = "Error calling the API";
    if (err.message) {
        if ("Failed to fetch" === err.message) {
            errorMessage = "Couldn't connect to the API server. Check if the server is down."
        } else {
            errorMessage = err.message
        }

    }
    throw new Error(errorMessage);
}