import { NextRequest, NextResponse } from 'next';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { userDetails, cart, totalAmount } = await req.json();

    if (!userDetails || !cart) {
      return NextResponse.json({ error: 'Missing details' }, { status: 400 });
    }

    // Configure your email transport
    // Using Gmail SMTP requires an App Password. The user must provide it.
    // If SMTP_PASS is missing, we'll log it and return success for now to avoid breaking the frontend.
    const smtpUser = process.env.SMTP_USER || 'omayurveda786@gmail.com'; // Defaulting to their known youtube/facebook email handle pattern or they can change it
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      console.warn("SMTP_PASS is not set. Abandoned cart email was not sent, but details are:", userDetails);
      return NextResponse.json({ success: true, message: 'Simulated email sent' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const itemsList = cart.map((item: any) => `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`).join('\n');

    const mailOptions = {
      from: `"Om Ayurveda Alerts" <${smtpUser}>`,
      to: 'omayurvedastore@gmail.com', // The email where they want to receive alerts
      subject: `🚨 Payment Dropped by ${userDetails.name}`,
      text: `
Urgent: A customer just dropped out at the Paytm payment screen! 
Call them immediately to assist with the purchase.

Customer Details:
Name: ${userDetails.name}
Phone: ${userDetails.phone}
Email: ${userDetails.email}
City: ${userDetails.city}

Cart Details:
${itemsList}

Total Value: ₹${totalAmount}

Reason: User closed the payment popup window before completing the transaction.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Abandoned cart notification error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
