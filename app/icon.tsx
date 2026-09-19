import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          borderRadius: 8,
          border: "1px solid #262626",
          color: "#fafafa",
          fontFamily: "monospace",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#a1a1aa" }}>~</span>
        <span>/</span>
      </div>
    ),
    {
      ...size,
    }
  )
}
