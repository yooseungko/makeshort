import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "숏폼 제작 전문 메이크쇼트",
  description: "틱톡 릴스 쇼츠 숏폼 제작 — 개당 15,000원 고정 단가로 1만~10만 조회수 보장. 기업 맞춤 CPV 개런티 모델까지. 터지는 숏폼을 만들어 드립니다.",
  keywords: ["숏폼", "숏폼 제작", "틱톡 영상", "릴스 제작", "유튜브 쇼츠", "숏폼 에이전시", "바이럴 영상", "영상 편집", "숏폼 광고", "숏폼 마케팅"],
  authors: [{ name: "MakeShort" }],
  creator: "MakeShort",
  publisher: "MakeShort",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "숏폼 제작 전문 메이크쇼트",
    description: "틱톡 릴스 쇼츠 숏폼 제작 — 개당 15,000원 고정 단가로 1만~10만 조회수 보장. 터지는 숏폼을 만들어 드립니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "MakeShort",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MakeShort - 터지는 숏폼을 만들어 드립니다",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "숏폼 제작 전문 메이크쇼트",
    description: "틱톡 릴스 쇼츠 숏폼 제작 — 개당 15,000원 고정 단가로 1만~10만 조회수 보장",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://makeshort.vercel.app",
  },
  verification: {
    google: "", // 나중에 Google Search Console 인증 코드 추가
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
