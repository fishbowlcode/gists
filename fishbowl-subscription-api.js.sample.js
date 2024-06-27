/**
 * Subscribes through the Fishbowl API.
 *
 * @param {Object} formValues - The form data to be sent in the request body.
 * @param {string} formValues.firstName - User's first name.
 * @param {string} formValues.lastName - User's last name.
 * @param {string} formValues.email - User's email address.
 * @param {string} formValues.phoneNumber - User's phone number.
 * @param {string} formValues.zipCode - User's zip code.
 * @param {number} formValues.birthdayMonth - User's birthday month.
 * @param {number} formValues.birthdayDay - User's birthday day.
 * @param {number} formValues.birthdayYear - User's birthday year.
 * @param {boolean} formValues.receiveSms - User's SMS opt-in status.
 * @param {string} formValues.storeUuid - Store UUID.
 * @param {boolean} formValues.joinLoyaltyProgram - Join loyalty program status.
 * @param {string|null} formValues.tag - Tag (optional).
 * @param {string|null} formValues.campaignUuid - Campaign UUID (optional).
 * @param {string} formValues.source - Source of the subscription.
 * @param {string} formValues.brandUuid - Brand UUID.
 * @param {string} formValues.listUuid - List UUID.
 * @returns {Promise<ApiResponse>} - The response object containing the result or error message.
 *

/**
 * @typedef {Object} ApiResponse
 * @property {ApiResult|null} result - The result of the API call.
 * @property {string|null} err - The error message, if an error occurred.
 */

/**
 * @typedef {Object} ApiResult
 * @property {boolean} success - Indicates if the request was successful.
 * @property {string} message - A message related to the request.
 * @property {ApiData} data - The data returned by the API.
 * @property {Object|null} errors - Any errors returned by the API.
 * @property {string|null} error_code - An error code, if applicable.
 * @property {boolean} cache_hit - Indicates if the response was a cache hit.
 */

/**
 * @typedef {Object} ApiData
 * @property {string} uuid - Unique identifier for the subscription.
 * @property {string} type - The type of the returned data.
 * @property {Object} attributes - Attributes related to the subscription.
 * @property {string} attributes.brandSchemaId - Brand schema ID.
 * @property {string} attributes.puuid - User's unique identifier.
 * @property {string} attributes.brandUuid - Brand UUID.
 * @property {string} attributes.muuid - Member's unique identifier.
 * @property {string} attributes.emailAddress - User's email address.
 * @property {string} attributes.firstName - User's first name.
 * @property {string} attributes.lastName - User's last name.
 * @property {string} attributes.birthdate - User's birthdate.
 * @property {string|null} attributes.weddingAnniversary - User's wedding anniversary.
 * @property {string} attributes.zipCode - User's zip code.
 * @property {string} attributes.storeSchemaId - Store schema ID.
 * @property {string} attributes.mobilePhone - User's mobile phone number.
 * @property {boolean} attributes.smsOptIn - User's SMS opt-in status.
 * @property {boolean} attributes.emailOptIn - User's email opt-in status.
 * @property {string|null} attributes.listUuid - List UUID.
 * @property {string} attributes.acquisitionSourceUuid - Acquisition source UUID.
 * @property {string} attributes.ipAddress - IP address of the request.
 * @property {string|null} attributes.requestJson - JSON of the request.
 * @property {string} attributes.createdDate - Date the subscription was created.
 * @property {Object} meta - Meta information about the response.
 * @property {Object} meta.timestamps - Timestamps related to the response.
 * @property {string|null} meta.timestamps.created - Creation timestamp.
 * @property {string|null} meta.timestamps.modified - Modification timestamp.
 * @property {Object} meta.authors - Information about the authors of the response.
 * @property {string|null} meta.authors.creator - Creator information.
 * @property {string|null} meta.authors.modifier - Modifier information.
 * @property {Object|null} relationships - Relationships in the response.
 */

async function subscribeThroughFishbowlApi(formValues) {
    /** @type {ApiResponse} */
    let response = {
        result: null,
        err: null,
    };

    try {
        const result = await fetch(
            "https://api.fishbowl.com/api/external/subscription/create",
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        if (!result.ok) {
            throw new Error(`HTTP Error | Status: ${result.status}`);
        }

        const data = await result.json();

        response.result = data;
    } catch (err) {
        response.err = err.message;
    }

    return response;
}