const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "516258147264-9nhdp0tkdh0rur37kkm2elcfotqsn488.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04w7L4agFu5JjCgYIARAAGAQSNwF-L9IrQ5NFnyRiP0A_4EGiajuzjd2H9dd0OtCo0EVDbpCIhT38U_mu4lWNVl6Nk0qWcwEJOLA";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMailToUser = async function (email, firstName, lastName) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "bbelagavi6@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Manjunath S Belagavi 📧 <bbelagavi6@gmail.com",
      to: email,
      subject: "Registration is Successfull",
      text: `Hi, ${firstName} ${lastName} you are successfully registered....`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = sendMailToUser;
