import { NextResponse } from 'next/server';
import { sendEmail, EmailData } from '../../utils/email';

export async function POST(req: Request) {
  const request = await req.json();
  const { email, subject, message } = request;

  if (!process.env.NEXT_PUBLIC_BREVO_EMAIL_SEND_TO) {
    return NextResponse.json(
      {
        error: true,
        emailSent: false,
        errors: ['Recipient email is not defined in environment variables'],
      },
      { status: 500 }
    );
  }

  const mailOptions: EmailData = {
    to: email,
    subject,
    text: message,
    html: `<div>${message}</div>`,
  };

  try {
    await sendEmail(mailOptions);
    return NextResponse.json(
      { error: false, emailSent: true, errors: [] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in send-email API:', error.message, error.stack);
    return NextResponse.json(
      {
        error: true,
        emailSent: false,
        errors: [{ message: error.message, stack: error.stack }],
      },
      { status: 500 }
    );
  }
}
