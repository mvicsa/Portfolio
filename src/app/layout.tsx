import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const jost = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MVICSA - Full Stack Developer & UI/UX Designer",
  description: "Professional portfolio of MVICSA, a passionate full-stack developer and UI/UX designer creating exceptional digital experiences.",
  keywords: ["Full Stack Developer", "UI/UX Designer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "MVICSA" }],
  creator: "MVICSA",
  openGraph: {
    title: "MVICSA - Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing web development, mobile apps, and UI/UX design projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVICSA - Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio showcasing web development, mobile apps, and UI/UX design projects.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${jost.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
