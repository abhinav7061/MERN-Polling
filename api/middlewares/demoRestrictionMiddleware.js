const { sendErrorResponse } = require("./erroHandle");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function demoRestrictionMiddleware(req, res, next) {
    const demoUserEmails = [
        'pollab@pollab.pollab',
        'test@test.test'
    ]
    const demoUserIds = [
        new ObjectId("654781a76070c76f9efda954"),
        new ObjectId("65676e80d7cd99abe88b4e4f")
    ];
    const isDemoUser = demoUserIds.some(id => id.equals(req?.user?._id)) || demoUserEmails.includes(req?.body?.email);

    if (isDemoUser && req.method !== 'GET') {
        return sendErrorResponse(res, 403, 'This is a Demo User.');
    }
    next();
}

module.exports = demoRestrictionMiddleware;
