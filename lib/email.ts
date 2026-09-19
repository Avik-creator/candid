import "server-only"
import * as React from "react"
import { Resend } from "resend"
import { APP_URL } from "@/lib/config"
import { NewMessageEmail } from "@/components/emails/new-message-email"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendNewMessageEmail({
  to,
  recipientName,
  messageBody,
  username,
}: {
  to: string
  recipientName: string
  messageBody: string
  username?: string
}) {
  if (!resend) {
    return { success: false, reason: "RESEND_API_KEY not set" }
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Candid <notifications@candid.avikmukherjee.com>"
  const dashboardUrl = `${APP_URL}/dashboard`
  const profileUrl = username ? `${APP_URL}/u/${username}` : undefined

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `New anonymous message on Candid`,
      react: React.createElement(NewMessageEmail, {
        recipientName: recipientName || "there",
        messageBody,
        dashboardUrl,
        profileUrl,
      }),
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
