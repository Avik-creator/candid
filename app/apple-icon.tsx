import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          borderRadius: 36,
          border: "2px solid #27272a",
          color: "#fafafa",
          fontFamily: "monospace",
          fontSize: 84,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#a1a1aa" }}>~</span>
          <span>/</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
