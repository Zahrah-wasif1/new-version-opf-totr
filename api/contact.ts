import { NextRequest } from 'next/server';
import { successResponse, errorResponse, handleError } from './lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return errorResponse('Name, email, subject, and message are required', 400);
    }

    // Here you can add email sending logic or save to database
    // For now, we'll just return success
    // You can integrate with services like SendGrid, Resend, or Nodemailer

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return successResponse({
      message: 'Thank you for your message! We will get back to you soon.',
    });
  } catch (error) {
    return handleError(error);
  }
}

