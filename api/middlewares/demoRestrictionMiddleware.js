const { sendErrorResponse } = require("./erroHandle");

function demoRestrictionMiddleware(req, res, next) {
    const isDemoUser = req.body.email == "pollab@pollab.pollab" || req?.user?._id == '654781a76070c76f9efda954' || req?.user?.role === 'demo';
    if (isDemoUser && req.method !== 'GET') {
        return sendErrorResponse(res, 403, 'This is a Demo User.');
    }
    next();
}

module.exports = demoRestrictionMiddleware;
