import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "DAML By Example"
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#0f172a",
          padding: 64,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#1f4e79",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>
              DAML By Example
            </div>
            <div style={{ fontSize: 16, color: "#64748b", marginTop: 4 }}>
              damlbyexample.xyz
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: 0,
              color: "#0f172a",
            }}
          >
            DAML By Example
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#334155",
              maxWidth: 680,
            }}
          >
            Basics, contracts, testing, patterns, advanced, finance. All in one place.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["Basics", "Contracts", "Testing", "Patterns", "Advanced", "Finance"].map((label) => (
            <div
              key={label}
              style={{
                padding: "14px 18px",
                borderRadius: 999,
                background: "#e2e8f0",
                color: "#0f172a",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
