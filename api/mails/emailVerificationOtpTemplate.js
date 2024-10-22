exports.getEmailVerificationOtpHtml = (otp, userName, validFor) => {
  return `
  <html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style type="text/css">
        @media only screen and (max-width: 600px) {
            table[class="container"] {
                width: 100% !important;
            }
            td[class="mobile-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Nunito', Arial, sans-serif; background-color: #f9f9f9;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9f9f9; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" class="container" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #14113c; padding-top: 25px; text-align: center;">
                            <img src="${process.env.COMPANY_LOGO}" alt="Company Logo" style="max-width: 100px; display: inline-block;">
                        </td>
                    </tr>
                    <!-- Title Section -->
                    <tr>
                        <td style="background-color: #14113c; color: #ffffff; text-align: center; padding: 20px; padding-bottom: 40px">
                            <h2 style="margin: 0; font-size: 18px; font-weight: normal;">THANKS FOR REGISTERING ON ${process.env.COMPANY_NAME.toUpperCase()}!</h2>
                            <h1 style="margin: 10px 0 0; font-size: 24px; font-weight: bold;">Verify Your E-Mail Address</h1>
                        </td>
                    </tr>
                    <!-- Content Section -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <h4 style="color: #374151; margin: 0;">Hello ${userName},</h4>
                            <p style="color: #4b5563; line-height: 1.5;">
                                Please use the following One Time Password (OTP) to verify your account.
                            </p>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0; text-align: center;">
                                <!-- OTP Section -->
                                <tr>
                                    <td align="center">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                ${otp.split('').map(item => `
                                                    <td style="padding: 0 5px;">
                                                        <span style="border: 1px solid #14113c; border-radius: 8px; width: 40px; height: 40px; font-size: 16px; font-weight: bold; color: #14113c; text-align: center; vertical-align: middle; background-color: #ffffff; padding: 10px; margin-right: 5px;">
                                                          ${item}
                                                        </span>
                                                    </td>
                                                `).join('')}
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #4b5563; margin-top: 20px; line-height: 1.5;">
                                This passcode will only be valid for the next <strong>${validFor} minutes</strong>.
                            </p>
                            <p style="color: #4b5563; margin-top: 30px;">
                                Thank you, <br />
                                ${process.env.COMPANY_NAME} Team
                            </p>
                        </td>
                    </tr>
                    <!-- Footer Section -->
                    <tr>
                        <td style="background-color: #d1d5db; padding: 30px; text-align: center;">
                            <h3 style="color: #14113c; font-size: 20px; margin-bottom: 10px;">Get in touch</h3>
                            <p style="color: #4b5563; margin: 0;">
                                <a href="tel:${process.env.COMPANY_CONTACT_NUMBER}" style="color: #4b5563; text-decoration: none;">${process.env.COMPANY_CONTACT_NUMBER}</a>
                            </p>
                            <p style="color: #4b5563; margin: 0;">
                                <a href="mailto:${process.env.COMPANY_INFO_EMAIL}" style="color: #4b5563; text-decoration: none;">${process.env.COMPANY_INFO_EMAIL}</a>
                            </p>
                            <div style="text-align: center; font-size: 0; margin-top: 15px"> <!-- Use font-size: 0 to remove gaps between inline-block elements -->
                                <a href="${process.env.COMPANY_SOCIAL_LINKEDIN}" style="display: inline-block; margin: 5px;"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/linkedin_wxvqt8" alt="Linkedin" style="width: 30px; height: 30px; object-fit: cover; border-radius: 100%;"></a>
                                <a href="${process.env.COMPANY_SOCIAL_TWITTER}" style="display: inline-block; margin: 5px;"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/twitter_m1vb6g" alt="Twitter" style="width: 30px; height: 30px; object-fit: cover; border-radius: 100%;"></a>
                                <a href="${process.env.COMPANY_SOCIAL_FACEBOOK}" style="display: inline-block; margin: 5px;"><img src="https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,q_auto/v1727554679/Polling/assets/facebook_dxeraw" alt="Facebook" style="width: 30px; height: 30px; object-fit: cover; border-radius: 100%;"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #14113c; color: #ffffff; text-align: center; padding: 15px;">
                            <p style="margin: 0;">© 2023 ${process.env.COMPANY_NAME}. All Rights Reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
