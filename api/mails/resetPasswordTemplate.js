const getResetPasswordHTMLTemplate = (userName, RESET_PASSWORD_URL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #e6e6e6;">
            <div style="text-align: center; background-color: #14113c; padding: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <a href=${process.env.FRONTEND_URL} target="_blank">
                                            <img src="${process.env.COMPANY_LOGO}" alt="Company Logo" style="max-width: 100px;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Please reset your password</h1>
            </div>
            <div style="padding: 20px;">
                <h2 style="color: #14113c; font-size: 22px;">Hello ${userName},</h2>
                <p style="color: #333333; font-size: 16px;">We have sent you this email in response to your request to reset your password on ${process.env.COMPANY_NAME}.</p>
                <p style="color: #333333; font-size: 16px;">To reset your password, please follow the link below:</p>
                <div style="text-align:center; width:100%;">
                    <a href="${RESET_PASSWORD_URL}" target="_blank" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #14113c; color: #ffffff; text-decoration: none; font-size: 16px;">Reset Password</a>
                </div>
                <p style="color: #333333; font-size: 16px;">Please ignore this email if you did not request a password change.</p>
            </div>
            <div style="text-align:center; background-color: #14113c; padding: 20px; color: #ffffff; font-size: 14px;">
                <p>Contact</p>
                <p>MMEC, Mullana, 133207</p>
                <p>+919709838073 | <a href="mailto:${process.env.COMPANY_INFO_EMAIL}" style="color: #ffffff; text-decoration: none;">${process.env.COMPANY_INFO_EMAIL}</a></p>
                <div style="display:flex; justify-content: center; margin: 5px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <a href="${process.env.COMPANY_SOCIAL_LINKEDIN}"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/linkedin_wxvqt8" alt="Linkedin" style="width: 30px; height: 30px; object-fit: cover; margin: 5px 5px; border-radius: 100%;"></a>
                                    </td>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <a href="${process.env.COMPANY_SOCIAL_TWITTER}"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/twitter_m1vb6g" alt="Twitter" style="width: 30px; height: 30px; object-fit: cover; margin: 5px 5px; border-radius: 100%;"></a>
                                    </td>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <a href="${process.env.COMPANY_SOCIAL_FACEBOOK}"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/facebook_dxeraw" alt="Facebook" style="width: 30px; height: 30px; object-fit: cover; margin: 5px 5px; border-radius: 100%;"></a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                </div>
                <p>${process.env.COMPANY_NAME} © All Rights Reserved</p>
            </div>
        </div>
    </body>
    </html>
    `
};

module.exports = getResetPasswordHTMLTemplate;