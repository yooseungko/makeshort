"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, Zap, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 hero-bg-animated" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            숏폼 제작 전문 에이전시
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">터지는 숏폼</span>을
            <br />
            만들어 드립니다
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            영상 하나에 <span className="text-primary font-semibold">1만~10만 조회수</span>를 보장합니다.
            <br />
            가성비 최고의 고정 단가 숏폼 제작 서비스
          </p>

          {/* Stats Preview */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-foreground/70" />
              <span className="text-sm">평균 조회수 <strong className="text-primary">50,000+</strong></span>
            </div>
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
              <Play className="w-5 h-5 text-foreground/70" />
              <span className="text-sm">누적 제작 <strong className="text-primary">1,000+</strong> 건</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">
                바로 상담하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          {/* Price Preview */}
          <p className="mt-8 text-muted-foreground text-sm">
            개당 <span className="text-primary font-bold">15,000원</span>부터 시작
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
