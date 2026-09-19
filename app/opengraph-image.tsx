import { ImageResponse } from "next/og"

export const alt = "Candid — Anonymous messages, honestly"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px 80px",
          fontFamily: "monospace",
          border: "1px solid #27272a",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#fafafa",
            }}
          >
            <span style={{ color: "#71717a" }}>~/</span>
            <span>candid</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid #27272a",
              backgroundColor: "#18181b",
              color: "#a1a1aa",
              fontSize: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span>anonymous inbox</span>
          </div>
        </div>

        {/* Hero message box preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            backgroundColor: "#121215",
            border: "1px solid #27272a",
            borderRadius: "20px",
            padding: "44px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fafafa",
              lineHeight: 1.15,
            }}
          >
            <div style={{ display: "flex" }}>Anonymous messages,</div>
            <div style={{ display: "flex" }}>honestly.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: 860,
            }}
          >
            Share your link, collect unfiltered feedback, and publish the answers you love.
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 18,
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span style={{ display: "flex" }}>• 100% Anonymous</span>
            <span style={{ display: "flex" }}>• No Account Needed</span>
            <span style={{ display: "flex" }}>• Spam Protected</span>
          </div>
          <div style={{ display: "flex", color: "#e4e4e7" }}>candid.avikmukherjee.com</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
