"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Building2, TrendingUp, Shield, ArrowRight } from "lucide-react";

interface CPVTier {
    views: string;
    cpv: string;
    totalPrice: string;
    popular?: boolean;
}

const cpvTiers: CPVTier[] = [
    {
        views: "50만",
        cpv: "10원",
        totalPrice: "500만원",
    },
    {
        views: "100만",
        cpv: "8원",
        totalPrice: "800만원",
    },
    {
        views: "300만",
        cpv: "5원",
        totalPrice: "1,500만원",
        popular: true,
    },
    {
        views: "500만",
        cpv: "4원",
        totalPrice: "2,000만원",
    },
    {
        views: "1,000만",
        cpv: "3원",
        totalPrice: "3,000만원",
    },
];

const benefits = [
    "조회수 100% 보장 (미달 시 전액 환불)",
    "전담 프로젝트 매니저 배정",
    "맞춤형 콘텐츠 전략 수립",
    "A/B 테스트 & 최적화",
    "실시간 성과 대시보드 제공",
    "월간 성과 리포트 제공",
];

export function Enterprise() {
    return (
        <section id="enterprise" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        <Building2 className="w-4 h-4 mr-2" />
                        기업 전용
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">조회수 개런티</span> 모델
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        확실한 성과를 원하는 기업을 위한 CPV(Cost Per View) 기반 과금 모델.
                        <br />
                        <span className="text-primary font-semibold">조회수가 높을수록 CPV 단가가 낮아집니다.</span>
                    </p>
                </div>

                {/* CPV Pricing Table */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="glass-strong rounded-2xl overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-2 md:gap-4 p-4 bg-muted/30 border-b border-border text-xs md:text-sm font-semibold">
                            <div>보장 조회수</div>
                            <div className="text-center">CPV 단가</div>
                            <div className="text-center">총 비용</div>
                            <div className="text-right">선택</div>
                        </div>

                        {/* Table Rows */}
                        {cpvTiers.map((tier, index) => (
                            <div
                                key={tier.views}
                                className={`grid grid-cols-4 gap-2 md:gap-4 p-3 md:p-4 items-center border-b border-border/50 last:border-b-0 hover:bg-muted/20 transition-colors ${tier.popular ? "bg-primary/5" : ""
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                    <span className="text-sm md:text-lg font-bold">{tier.views}</span>
                                    {tier.popular && (
                                        <Badge className="text-[10px] md:text-xs px-1 md:px-2 py-0 h-4 md:h-5 w-fit">인기</Badge>
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className="text-lg md:text-2xl font-bold gradient-text">{tier.cpv}</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-xs md:text-lg font-semibold">{tier.totalPrice}</span>
                                </div>
                                <div className="text-right">
                                    <Button
                                        size="sm"
                                        variant={tier.popular ? "default" : "outline"}
                                        className="h-7 test-xs px-2 md:h-9 md:px-4 md:text-sm"
                                        asChild
                                    >
                                        <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">
                                            상담
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CPV Explanation */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>조회수 규모가 클수록 CPV가 최대 <strong className="text-primary">70%</strong> 절감됩니다</span>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-center mb-8">기업 고객 전용 혜택</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 glass rounded-xl p-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Check className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="glass-strong rounded-2xl p-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-primary" />
                            <span className="font-semibold">100% 조회수 보장</span>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            목표 조회수 미달 시 100% 환불 또는 추가 영상 제작으로 보상해 드립니다.
                        </p>
                        <Button size="lg" className="px-8" asChild>
                            <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">
                                기업 상담 신청
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
