
function errorMessage(message) {
    return {
        apiResponseStatus: false,
        apiResponseData: {
            apiResponseMessage: message,
        },
    };
}

function validationErrorResponse(message) {
    return errorMessage(message);
}

function apiFailureResponse(message) {
    return errorMessage(message);
}


function serverErrorResponse(message) {
    return errorMessage(message);
}

function apiSuccessResponse(message, payload) {
    const response = {
        apiResponseStatus: true,
        apiResponseData: payload,
    };
    response.apiResponseData.apiResponseMessage = message;
    return response;
}




module.exports.internalErrorResponse = serverErrorResponse;
module.exports.apiFailureResponse = apiFailureResponse;
module.exports.apiSuccessResponse = apiSuccessResponse;
module.exports.validationErrorResponse = validationErrorResponse;
module.exports.apiSuccessStatus = 200;
module.exports.apiInternalServerErrorStatus = 500;
module.exports.apiBadRequestStatus = 400;
module.exports.apiUserUnauthorizedStatus = 401;
module.exports.apiNotFoundStatus = 404;