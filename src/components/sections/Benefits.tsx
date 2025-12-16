"use client";

import { Badge } from "@/components/ui/badge";
import {
    Zap,
    Clock,
    TrendingUp,
    Palette,
    HeadphonesIcon,
    Lightbulb
} from "lucide-react";

const benefits = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: "압도적인 가성비",
        description: "업계 최저 수준의 고정 단가로 고퀄리티 영상을 제공합니다.",
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "검증된 조회수",
        description: "평균 1만~10만 조회수 달성. 알고리즘에 최적화된 영상 제작.",
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "빠른 납품",
        description: "영업일 기준 2~5일 내 납품. 긴급 요청도 대응 가능합니다.",
    },
    {
        icon: <Palette className="w-6 h-6" />,
        title: "트렌드 반영",
        description: "최신 숏폼 트렌드와 밈을 빠르게 반영한 콘텐츠 제작.",
    },
    {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "최고의 기획",
        description: "바이럴을 만드는 전문 기획팀이 콘텐츠 전략을 설계합니다.",
    },
    {
        icon: <HeadphonesIcon className="w-6 h-6" />,
        title: "전담 매니저",
        description: "1:1 전담 매니저가 프로젝트를 처음부터 끝까지 관리합니다.",
    },
];

export function Benefits() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        왜 저희인가요?
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        저희가 <span className="gradient-text">특별한 이유</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        단순한 영상 편집이 아닌, 성과를 만들어내는 전략적 콘텐츠를 제작합니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="group glass rounded-2xl p-6 hover-lift"
                        >
                            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-foreground/70 mb-4 group-hover:text-primary transition-colors">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
