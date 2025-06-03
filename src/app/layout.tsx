import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import SmoothScrolling from "@/components/smooth-scrolling";
import { Footer } from "@/components/ui/footer";
import Navbar from "@/components/layout.tsx/navbar";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

const trap = localFont({
  src: [
    {
      path: '../../public/font/trap/Trap-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/font/trap/Trap-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-trap',
});

export const metadata: Metadata = {
  // Title configuration
  title: {
    default: 'Haseeb Ahmed Raza Khan – Full Stack Developer',
    template: '%s | Haseeb Ahmed Raza Khan'
  },
  description: "Haseeb Ahmed Raza Khan is a full stack developer. He has helped many companies to build their websites and applications.",
  keywords: [
    "Haseeb Ahmed Raza Khan",
    "Haseeb Ahmed",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "WordPress Developer",
    "Website Developer in Pakistan",
    "Haseeb Ahamed Programmer"
  ],
  authors: [{ name: "Haseeb Ahmed Raza Khan", url: "https://haseebkhan.online" }],
  creator: "Haseeb Ahmed Raza Khan",
  publisher: "Haseeb Ahmed Raza Khan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://haseebkhan.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Haseeb Ahmed Raza Khan – Full Stack Developer',
    description: 'Haseeb Ahmed Raza Khan is a full stack developer. He has helped many companies to build their websites and applications.',
    url: 'https://haseebkhan.online',
    siteName: 'Haseeb Ahmed Raza Khan Portfolio',
    images: [
      {
        url: 'Haseeb-Ahmed-Raza-Khan-Full-Stack-Developer-OpenGrah-Image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Haseeb Ahmed Raza Khan – Full Stack Developer',
    description: 'Haseeb Ahmed Raza Khan is a full stack developer. He has helped many companies to build their websites and applications.',
    creator: '@haseeb_dev_',
    images: ['Haseeb-Ahmed-Raza-Khan-Full-Stack-Developer-OpenGrah-Image.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

// Separate viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/haseeb-logo.webp" sizes="any" />
        <Script
          src="https://api.cronbot.ai/v1/widgets/app/app_ms1c995bmr1f"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${trap.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full h-screen select-none">
            <SmoothScrolling>
              <Navbar />
              {children}
              <Footer />
            </SmoothScrolling>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
