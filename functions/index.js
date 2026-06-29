const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");
const SENDER = "sophieryza@gmail.com";
const RECIPIENT = "sageryza@gmail.com";

function transport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SENDER, pass: GMAIL_APP_PASSWORD.value() },
  });
}
async function notify(subject, text) {
  await transport().sendMail({ from: SENDER, to: RECIPIENT, subject, text });
}

exports.onNewMember = onDocumentCreated({ document: "members/{id}", secrets: [GMAIL_APP_PASSWORD] }, async (e) => {
  const d = e.data?.data() || {};
  await notify("New PWC member", `Email: ${d.email || "unknown"}\nCity: ${d.city || "—"}`);
});
exports.onNewRsvp = onDocumentCreated({ document: "rsvps/{id}", secrets: [GMAIL_APP_PASSWORD] }, async (e) => {
  const d = e.data?.data() || {};
  await notify("New RSVP", `Event: ${d.eventTitle || "—"}\nFrom: ${d.email || "unknown"}`);
});
exports.onNewNote = onDocumentCreated({ document: "observations/{id}", secrets: [GMAIL_APP_PASSWORD] }, async (e) => {
  const d = e.data?.data() || {};
  await notify("New field note", `${d.body || ""}\n— ${d.authorName || "Anonymous"}`);
});
