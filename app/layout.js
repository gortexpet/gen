
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
      <script src="https://cdn.tailwindcss.com"></script>

      </head>
      <body>{children}</body>
    </html>
  )
}
