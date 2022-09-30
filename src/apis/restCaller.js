/**
 * This class offer methods to call the rest API and manage the possible errors
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