/**
 * Sending the contact form. The form module hands over the field values and
 * learns only whether the message left; the endpoint and its protocol stop
 * here.
 */

const ENDPOINT = 'https://formspree.io/f/xjgpopka';

export async function sendMessage(fields: Record<string, string>): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) throw new Error('Message could not be delivered');
}
