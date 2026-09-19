import "server-only"
import { Resend } from "resend"
import { APP_URL } from "@/lib/config"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendNewMessageEmail({
  to,
  recipientName,
  messageBody,
}: {
  to: string
  recipientName: string
  messageBody: string
}) {
  if (!resend) {
    // If RESEND_API_KEY is not configured yet, skip silently
    return { success: false, reason: "RESEND_API_KEY not set" }
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Candid <notifications@candid.avikmukherjee.com>"
  const dashboardUrl = `${APP_URL}/dashboard`

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `New anonymous message on Candid`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New anonymous message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fafafa;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 32px 32px; text-align: left;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 24px;">
              <span style="font-family: monospace; font-size: 20px; font-weight: bold; color: #fafafa;">
                <span style="color: #71717a;">~/</span>candid
              </span>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom: 8px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #fafafa; letter-spacing: -0.02em;">
                You received a new message
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                Hey ${recipientName || "there"}, someone just left an anonymous note on your link.
              </p>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding-bottom: 28px;">
              <div style="background-color: #18181b; border: 1px solid #27272a; border-left: 3px solid #71717a; border-radius: 8px; padding: 18px 20px;">
                <p style="margin: 0; font-size: 15px; color: #f4f4f5; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">
                  &ldquo;${escapeHtml(messageBody)}&rdquo;
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding-bottom: 32px;">
              <a href="${dashboardUrl}" style="display: inline-block; background-color: #fafafa; color: #09090b; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 6px; letter-spacing: -0.01em;">
                Open Inbox to Reply &rarr;
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top: 1px solid #27272a; padding-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #71717a; line-height: 1.5;">
                Reply or publish answers to your public wall at <a href="${dashboardUrl}" style="color: #a1a1aa; text-decoration: underline;">candid</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `You received a new anonymous message on Candid!\n\n"${messageBody}"\n\nOpen your inbox to read or reply: ${dashboardUrl}`,
    })

    if (error) {
      console.error("[Email] Failed to send notification via Resend:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error("[Email] Unexpected error sending email:", err)
    return { success: false, error: err }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
