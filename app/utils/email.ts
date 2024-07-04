import nodemailer from 'nodemailer';

const smtpHost = process.env.NEXT_PUBLIC_BREVO_SMTP_HOST;
const smtpPort = parseInt(process.env.NEXT_PUBLIC_BREVO_SMTP_PORT || '587', 10);
const smtpUser = process.env.NEXT_PUBLIC_BREVO_EMAIL_SEND_TO;
const smtpPass = process.env.NEXT_PUBLIC_BREVO_API_KEY;

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  console.error(
    'SMTP configuration is missing. Please check your environment variables.'
  );
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: EmailData): Promise<void> {
  const mailOptions = {
    from: smtpUser,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error: any) {
    console.error('Error sending email:', error.message, error.stack);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
