// Contact form handler — sends notification to Trapeze + confirmation to submitter via Resend

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const NOTIFY_TO = 'info@trapezemedia.co.uk';
const FROM_ADDRESS = 'Trapeze Media <noreply@trapezemedia.co.uk>';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid payload' };
  const b = body as Record<string, unknown>;

  if (!isString(b.name) || b.name.trim().length === 0 || b.name.trim().length > 100) {
    return { ok: false, error: 'Name is required (max 100 characters)' };
  }
  if (!isString(b.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()) || b.email.trim().length > 255) {
    return { ok: false, error: 'A valid email is required' };
  }
  if (!isString(b.message) || b.message.trim().length === 0 || b.message.trim().length > 5000) {
    return { ok: false, error: 'Message is required (max 5000 characters)' };
  }
  if (b.phone !== undefined && b.phone !== null && b.phone !== '') {
    if (!isString(b.phone) || b.phone.trim().length > 50) {
      return { ok: false, error: 'Invalid phone number' };
    }
  }

  return {
    ok: true,
    data: {
      name: b.name.trim(),
      email: b.email.trim(),
      message: b.message.trim(),
      phone: isString(b.phone) ? b.phone.trim() : undefined,
    },
  };
}

async function sendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
}): Promise<{ ok: boolean; status: number; body: unknown }> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.reply_to ? { reply_to: payload.reply_to } : {}),
    }),
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body: data };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const result = validate(parsed);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message, phone } = result.data;

  // Notification email to Trapeze
  const notifyHtml = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    <hr />
    <p style="color:#888;font-size:12px;">Sent via trapezemedia.co.uk contact form</p>
  `;

  // Confirmation email to submitter
  const confirmHtml = `
    <h2>Thanks for getting in touch, ${escapeHtml(name)}!</h2>
    <p>We've received your message and will get back to you as soon as possible.</p>
    <p>For reference, here's what you sent:</p>
    <blockquote style="border-left:3px solid #d62a7a;padding-left:12px;color:#555;white-space:pre-wrap;">${escapeHtml(message)}</blockquote>
    <p>In the meantime, feel free to follow us on <a href="https://www.instagram.com/trapezemedia">Instagram</a> or <a href="https://www.linkedin.com/company/trapeze-media">LinkedIn</a>.</p>
    <p>— The Trapeze Media team</p>
  `;

  try {
    const notify = await sendEmail({
      to: [NOTIFY_TO],
      subject: `New enquiry from ${name}`,
      html: notifyHtml,
      reply_to: email,
    });

    if (!notify.ok) {
      console.error('Notification email failed', notify.status, notify.body);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification', details: notify.body }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Confirmation is best-effort — don't fail the whole request if it fails
    const confirm = await sendEmail({
      to: [email],
      subject: 'Thanks for contacting Trapeze Media',
      html: confirmHtml,
    });

    if (!confirm.ok) {
      console.warn('Confirmation email failed (non-fatal)', confirm.status, confirm.body);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('contact-form error', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
