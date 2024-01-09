const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendAccountClosureEmail = functions.auth.user().onDelete((user) => {
  const email = user.email;

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Account Closure Confirmation",
    text: "Your account has been successfully closed.",
  };

  return admin
    .firestore()
    .collection("emails")
    .add(mailOptions)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
});
