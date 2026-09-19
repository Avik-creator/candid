import { ImageResponse } from "next/og"
import { getProfileByUsername } from "@/lib/queries"

export const alt = "Send an anonymous message on Candid"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

type Props = {
  params: Promise<{ username: string }>
}

export default async function Image({ params }: Props) {
  const { username } = await params
  const profile = await getProfileByUsername(username)

  const name = profile?.display_name || `@${username}`
  const prompt = profile?.prompt || "send me anonymous messages!"

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
              fontSize: 28,
              fontWeight: 600,
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
            <span>anonymous message</span>
          </div>
        </div>

        {/* Profile Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "#121215",
            border: "1px solid #27272a",
            borderRadius: "20px",
            padding: "40px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#fafafa",
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#71717a",
              }}
            >
              @{username}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "8px",
              fontSize: 26,
              color: "#e4e4e7",
              borderLeft: "3px solid #3f3f46",
              paddingLeft: "20px",
              lineHeight: 1.4,
            }}
          >
            &ldquo;{prompt}&rdquo;
          </div>
        </div>

        {/* Footer */}
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
          <div style={{ display: "flex" }}>Drop an anonymous note • No login required</div>
          <div style={{ display: "flex", color: "#e4e4e7" }}>candid.avikmukherjee.com/u/{username}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
