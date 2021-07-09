function InvalidApiKeyError(message = "") {
    this.name = "InvalidApiKeyError";
    this.message = message;
}
InvalidApiKeyError.prototype = Error.prototype;

function UnauthorizedError(message = "") {
    this.name = "UnauthorizedError";
    this.message = message;
}
UnauthorizedError.prototype = Error.prototype;

function InvalidParametersError(message = "") {
    this.name = "InvalidParametersError";
    this.message = message;
}
InvalidParametersError.prototype = Error.prototype;

function InvalidEndpointError(message = "") {
    this.name = "InvalidEndpointError";
    this.message = message;
}
InvalidEndpointError.prototype = Error.prototype;

function InvalidVersionError(message = "") {
    this.name = "InvalidVersionError";
    this.message = message;
}
InvalidVersionError.prototype = Error.prototype;

function DepreciationError(message = "") {
    this.name = "DepreciationError";
    this.message = message;
}
DepreciationError.prototype = Error.prototype;

function NotEnoughParametersError(message = "") {
    this.name = "NotEnoughParametersError";
    this.message = message;
}
NotEnoughParametersError.prototype = Error.prototype;

// module.exports = {
//     InvalidApiKeyError : InvalidApiKeyError,
//     UnauthorizedError : UnauthorizedError,
//     InvalidParametersError : InvalidParametersError,
//     InvalidEndpointError : InvalidEndpointError,
//     InvalidVersionError : InvalidVersionError,
//     DepreciationError : DepreciationError,
// }

module.exports = {
    InvalidApiKeyError,
    UnauthorizedError,
    InvalidParametersError,
    InvalidEndpointError,
    InvalidVersionError,
    DepreciationError,
    NotEnoughParametersError
}