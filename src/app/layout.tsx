import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const jost = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohamed Abdelqader - MERN Stack Developer",
  description: "Professional portfolio of Mohamed Abdelqader, a passionate MERN Stack developer creating exceptional digital experiences.",
  keywords: ["MERN Stack Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Mohamed Abdelqader" }],
  creator: "Mohamed Abdelqader",
  openGraph: {
    title: "Mohamed Abdelqader - MERN Stack Developer",
    description: "Professional portfolio showcasing web development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Abdelqader - MERN Stack Developer",
    description: "Professional portfolio showcasing web development.",
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
