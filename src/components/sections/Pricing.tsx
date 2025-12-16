"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

interface PricingTier {
    name: string;
    description: string;
    price: string;
    priceLabel: string;
    features: string[];
    icon: React.ReactNode;
    popular?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "베이직",
        description: "간단한 편집이 필요한 분들께",
        price: "15,000",
        priceLabel: "원 / 개",
        icon: <Zap className="w-6 h-6" />,
        features: [
            "기본 컷편집",
            "자막 삽입",
            "배경음악 추가",
            "기본 트랜지션",
            "1080p 화질",
            "영업일 기준 2일 내 납품",
        ],
    },
    {
        name: "스탠다드",
        description: "가장 인기있는 선택",
        price: "25,000",
        priceLabel: "원 / 개",
        icon: <Sparkles className="w-6 h-6" />,
        popular: true,
        features: [
            "고급 편집 효과",
            "애니메이션 자막",
            "사운드 이펙트",
            "컬러 그레이딩",
            "썸네일 제작",
            "무제한 수정",
            "영업일 기준 3일 내 납품",
        ],
    },
    {
        name: "AI 프리미엄",
        description: "AI 영상 제작 포함",
        price: "35,000",
        priceLabel: "원 / 개",
        icon: <Crown className="w-6 h-6" />,
        features: [
            "AI 영상 생성",
            "AI 보이스오버",
            "모션 그래픽",
            "프리미엄 효과",
            "A/B 테스트용 버전",
            "성과 분석 리포트",
            "전담 매니저 배정",
            "영업일 기준 5일 내 납품",
        ],
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        합리적인 가격
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">고정 단가</span>로 부담 없이
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        숨겨진 비용 없이 투명한 가격으로 최고의 퀄리티를 제공합니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative overflow-hidden hover-lift rounded-2xl p-6 ${tier.popular
                                ? "glass-strong border border-primary/50"
                                : "glass"
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    BEST
                                </div>
                            )}

                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 glass text-foreground/70">
                                {tier.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                            <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                                <span className="text-muted-foreground ml-1">{tier.priceLabel}</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={tier.popular ? "default" : "outline"}
                                asChild
                            >
                                <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">
                                    시작하기
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground text-sm">
                        대량 주문 시 추가 할인 가능 · 맞춤 견적은 문의해 주세요
                    </p>
                </div>
            </div>
        </section>
    );
}
