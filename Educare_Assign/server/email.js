import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS?.replace(/\s/g, ""),
    },
  });
}

export async function sendActivationEmail(user) {
  const { fullName, email, phone, company, agency } = user;
  const loginUrl = process.env.FRONTEND_URL || "http://localhost:5173/login";

  const info = await getTransporter().sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: email,
    subject: "Activate your PopX account",
    html: `
      <h2>Welcome to PopX, ${fullName}!</h2>
      <p>Your account has been created successfully.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Agency:</strong> ${agency || "N/A"}</p>
      <p>Click the button below to login and start using PopX:</p>
      <a href="${loginUrl}" style="display:inline-block;padding:12px 24px;background:#6c25ff;color:#fff;text-decoration:none;border-radius:8px;">
        Login to PopX
      </a>
      <p style="margin-top:20px;color:#666;">If you did not create this account, please ignore this email.</p>
    `,
  });

  console.log(`Activation email sent to ${email} (messageId: ${info.messageId})`);
}
