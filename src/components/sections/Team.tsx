"use client";

import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Sparkles } from "lucide-react";

const stats = [
    {
        icon: <Award className="w-6 h-6" />,
        value: "1억+",
        label: "누적 조회수",
    },
    {
        icon: <Users className="w-6 h-6" />,
        value: "50+",
        label: "전문 크리에이터",
    },
    {
        icon: <Target className="w-6 h-6" />,
        value: "500+",
        label: "브랜드 협업",
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        value: "98%",
        label: "고객 만족도",
    },
];

export function Team() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        전문 크루
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="gradient-text">1억뷰</span> 숏폼 제작 전문가 크루
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        당신의 브랜드와 제품을 숏폼으로 알려드립니다.
                        <br />
                        <span className="text-foreground font-medium">
                            틱톡, 릴스, 쇼츠를 모두 경험한 전문가들이 함께합니다.
                        </span>
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="glass rounded-2xl p-6 text-center hover-lift"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass flex items-center justify-center text-primary">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold gradient-text mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Description */}
                <div className="max-w-3xl mx-auto glass-strong rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                        왜 메이크숏 크루인가요?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="space-y-2">
                            <div className="font-semibold text-primary">🎬 경험</div>
                            <p className="text-sm text-muted-foreground">
                                뷰티, 푸드, 패션, 게임 등 다양한 분야에서 검증된 바이럴 노하우
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="font-semibold text-primary">📊 데이터</div>
                            <p className="text-sm text-muted-foreground">
                                알고리즘을 분석하고 트렌드를 읽어 최적의 콘텐츠 전략 수립
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="font-semibold text-primary">🚀 속도</div>
                            <p className="text-sm text-muted-foreground">
                                빠른 트렌드 반영과 신속한 제작으로 타이밍을 놓치지 않음
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
