import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface NewMessageEmailProps {
  recipientName?: string
  messageBody: string
  dashboardUrl: string
  profileUrl?: string
}

export const NewMessageEmail = ({
  recipientName = "there",
  messageBody,
  dashboardUrl,
  profileUrl,
}: NewMessageEmailProps) => {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>
          {`
            :root {
              color-scheme: light dark;
              supported-color-schemes: light dark;
            }

            /* Light mode defaults */
            .body-bg { background-color: #fafafa !important; }
            .card-bg { background-color: #ffffff !important; border-color: #e4e4e7 !important; }
            .msg-bg { background-color: #f4f4f5 !important; border-color: #e4e4e7 !important; }
            .text-primary { color: #09090b !important; }
            .text-muted { color: #71717a !important; }
            .text-dim { color: #a1a1aa !important; }
            .border-line { border-color: #e4e4e7 !important; }
            .candid-btn { background-color: #09090b !important; color: #ffffff !important; }
            .dot-indicator { background-color: #09090b !important; }

            /* Dark mode */
            @media (prefers-color-scheme: dark) {
              .body-bg { background-color: #000000 !important; }
              .card-bg { background-color: #09090b !important; border-color: #27272a !important; }
              .msg-bg { background-color: #121215 !important; border-color: #27272a !important; }
              .text-primary { color: #fafafa !important; }
              .text-muted { color: #a1a1aa !important; }
              .text-dim { color: #71717a !important; }
              .border-line { border-color: #27272a !important; }
              .candid-btn { background-color: #fafafa !important; color: #09090b !important; }
              .dot-indicator { background-color: #fafafa !important; }
            }
          `}
        </style>
      </Head>
      <Preview>New anonymous message on Candid</Preview>
      <Body className="body-bg" style={bodyStyle}>
        <Container className="card-bg" style={cardStyle}>
          {/* Top Brand Bar */}
          <Section style={brandSection}>
            <Text style={logoText}>
              <span className="text-dim" style={{ color: "#71717a" }}>~/</span>
              <span className="text-primary" style={{ color: "#fafafa" }}>candid</span>
            </Text>
          </Section>

          {/* Heading */}
          <Section style={headingSection}>
            <div style={statusRow}>
              <span className="dot-indicator" style={dotIndicator} />
              <span className="text-muted" style={statusText}>new anonymous note</span>
            </div>
            <Text className="text-primary" style={mainHeading}>
              You received a message
            </Text>
            <Text className="text-muted" style={subText}>
              Hey {recipientName}, someone just sent you an anonymous note on your link.
            </Text>
          </Section>

          {/* Message Box — styled identically to Candid's inbox message card */}
          <Section className="msg-bg" style={messageCardStyle}>
            <Text className="text-primary" style={messageContentStyle}>
              {messageBody}
            </Text>
          </Section>

          {/* Action Button & Link */}
          <Section style={actionsSection}>
            <Button
              className="candid-btn"
              style={actionBtnStyle}
              href={dashboardUrl}
            >
              open inbox to reply &rarr;
            </Button>

            {profileUrl ? (
              <div style={profileLinkRow}>
                <Link
                  href={profileUrl}
                  className="text-muted"
                  style={profileLinkStyle}
                >
                  view your public wall &rarr;
                </Link>
              </div>
            ) : null}
          </Section>

          <Hr className="border-line" style={hrStyle} />

          {/* Minimal Footer */}
          <Section style={footerSection}>
            <Text className="text-muted" style={footerLine}>
              <span style={{ fontFamily: "monospace" }}>candid</span> &mdash; anonymous messages, honestly.
            </Text>
            <Text className="text-dim" style={footerSubLine}>
              You received this email because someone submitted a message to your Candid profile.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

NewMessageEmail.PreviewProps = {
  recipientName: "Avik",
  messageBody: "Honestly the way you handled that meeting today was so smooth. You made everyone feel heard. Don't change.",
  dashboardUrl: "https://candid.avikmukherjee.com/dashboard",
  profileUrl: "https://candid.avikmukherjee.com/u/avikmukherjee",
} as NewMessageEmailProps

export default NewMessageEmail

// Styles
const bodyStyle = {
  backgroundColor: "#000000",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  padding: "40px 16px",
  margin: "0",
}

const cardStyle = {
  backgroundColor: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "8px",
  maxWidth: "520px",
  margin: "0 auto",
  padding: "32px 32px 28px",
}

const brandSection = {
  marginBottom: "24px",
}

const logoText = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "18px",
  fontWeight: "600" as const,
  letterSpacing: "-0.04em",
  margin: "0",
}

const headingSection = {
  marginBottom: "20px",
}

const statusRow = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "8px",
}

const dotIndicator = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#fafafa",
  marginRight: "6px",
  verticalAlign: "middle",
}

const statusText = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "12px",
  color: "#a1a1aa",
  verticalAlign: "middle",
}

const mainHeading = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "20px",
  fontWeight: "600" as const,
  color: "#fafafa",
  letterSpacing: "-0.03em",
  lineHeight: "1.3",
  margin: "0 0 6px 0",
}

const subText = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "13px",
  color: "#a1a1aa",
  lineHeight: "1.5",
  margin: "0",
}

const messageCardStyle = {
  backgroundColor: "#121215",
  border: "1px solid #27272a",
  borderRadius: "6px",
  padding: "18px 20px",
  marginBottom: "24px",
}

const messageContentStyle = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#fafafa",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-word" as const,
}

const actionsSection = {
  marginBottom: "20px",
}

const actionBtnStyle = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  backgroundColor: "#fafafa",
  color: "#09090b",
  fontSize: "13px",
  fontWeight: "500" as const,
  textDecoration: "none",
  borderRadius: "6px",
  padding: "10px 18px",
  display: "inline-block",
  border: "none",
}

const profileLinkRow = {
  marginTop: "14px",
}

const profileLinkStyle = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "12px",
  color: "#a1a1aa",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
}

const hrStyle = {
  borderColor: "#27272a",
  margin: "24px 0 20px 0",
}

const footerSection = {
  margin: "0",
}

const footerLine = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "12px",
  color: "#a1a1aa",
  margin: "0 0 6px 0",
}

const footerSubLine = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "11px",
  color: "#71717a",
  lineHeight: "1.4",
  margin: "0",
}
