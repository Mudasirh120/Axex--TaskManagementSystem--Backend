import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
let emailAPI = new TransactionalEmailsApi();
const sendMail = async (address, name) => {
  try {
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;
    let message = new SendSmtpEmail();
    message.subject = "First email";
    message.textContent = "Hello world!";
    message.sender = {
      name: "Axex Solutions",
      email: "trainingaxex@gmail.com",
    };
    message.to = [{ email: address, name: name }];
    const res = await emailAPI.sendTransacEmail(message);
    console.log(JSON.stringify(res.body));
  } catch (err) {
    console.error("Error sending email:", err.body);
  }
};
export { sendMail };
