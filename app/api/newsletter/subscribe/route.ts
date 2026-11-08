import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side API handler for newsletter subscriptions.
 * 
 * Supports production newsletter services (e.g. Buttondown, ConvertKit, Mailchimp)
 * via env vars when provided, and gracefully defaults to storing/returning
 * successful opt-in responses for development & static deployments.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, topic } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check for configured external newsletter API integrations
    const buttondownApiKey = process.env.BUTTONDOWN_API_KEY;
    const convertkitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertkitFormId = process.env.CONVERTKIT_FORM_ID;
    const newsletterWebhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

    // 1. Buttondown API integration
    if (buttondownApiKey) {
      const res = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          Authorization: `Token ${buttondownApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanEmail, tags: [topic || 'research-thoughts'] }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 400 && JSON.stringify(errData).includes('already subscribed')) {
          return NextResponse.json({
            success: true,
            alreadySubscribed: true,
            message: 'You are already subscribed to updates! Thank you for following the research.',
          });
        }
        return NextResponse.json(
          { success: false, error: errData.detail || 'Failed to subscribe with newsletter service.' },
          { status: res.status }
        );
      }
    }

    // 2. ConvertKit API integration
    if (convertkitApiKey && convertkitFormId) {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${convertkitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: convertkitApiKey,
          email: cleanEmail,
          tags: [topic || 'research-thoughts'],
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { success: false, error: 'Failed to subscribe with ConvertKit service.' },
          { status: res.status }
        );
      }
    }

    // 3. Custom Webhook integration
    if (newsletterWebhookUrl) {
      await fetch(newsletterWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          topic: topic || 'research-thoughts',
          subscribedAt: new Date().toISOString(),
        }),
      });
    }

    // Log subscription intent for server environment
    console.log(`[Newsletter] Subscribed: ${cleanEmail} (topic: ${topic || 'research-thoughts'})`);

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You will receive new research thought updates directly in your inbox.',
      email: cleanEmail,
    });
  } catch (error) {
    console.error('[Newsletter API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
