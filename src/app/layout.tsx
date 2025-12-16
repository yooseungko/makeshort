import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MakeShort | 터지는 숏폼 제작 서비스",
  description: "고정 단가로 1만~10만 조회수를 보장하는 숏폼 제작 전문 에이전시. 개당 15,000원부터 시작하는 가성비 최고의 영상 제작 서비스.",
  keywords: ["숏폼", "영상제작", "틱톡", "유튜브쇼츠", "인스타그램릴스", "바이럴", "영상편집"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MakeShort | 터지는 숏폼 제작 서비스",
    description: "고정 단가로 1만~10만 조회수를 보장하는 숏폼 제작 전문 에이전시",
    type: "website",
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
    title: "MakeShort | 터지는 숏폼 제작 서비스",
    description: "고정 단가로 1만~10만 조회수를 보장하는 숏폼 제작 전문 에이전시",
    images: ["/og-image.png"],
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
