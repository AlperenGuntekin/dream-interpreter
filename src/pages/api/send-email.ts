import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, EmailData } from '../../utils/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    if (!process.env.NEXT_PUBLIC_BREVO_EMAIL_SEND_TO) {
      return res.status(500).json({
        error: true,
        emailSent: false,
        errors: ['Recipient email is not defined in environment variables'],
      });
    }

    const mailOptions: EmailData = {
      to: email,
      subject,
      text: message,
      html: `<div>${message}</div>`,
    };

    try {
      await sendEmail(mailOptions);
      return res.status(200).json({
        error: false,
        emailSent: true,
        errors: [],
      });
    } catch (error: any) {
      console.error('Error in send-email API:', error.message, error.stack);
      return res.status(500).json({
        error: true,
        emailSent: false,
        errors: [{ message: error.message, stack: error.stack }],
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
