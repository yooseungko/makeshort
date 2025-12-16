"use client";

import { Badge } from "@/components/ui/badge";
import { Flame, Zap, TestTube } from "lucide-react";

const secrets = [
    {
        icon: <Flame className="w-8 h-8" />,
        title: "매일 파악하는 트렌드",
        description: "메이크숏 크루는 매일 아침 트렌드 회의로 하루를 시작합니다. 지금 뜨는 밈, 챌린지, 음원을 실시간으로 분석하여 콘텐츠에 즉시 반영합니다."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "민첩하고 핏(Fit)한 편집",
        description: "플랫폼마다 먹히는 문법은 다릅니다. 틱톡의 속도감, 릴스의 감성, 쇼츠의 정보성을 완벽하게 파악하여 가장 트렌디한 편집 스타일을 적용합니다."
    },
    {
        icon: <TestTube className="w-8 h-8" />,
        title: "다채널 바이럴 테스트",
        description: "감에만 의존하지 않습니다. 여러 채널에 테스트 업로드 후 반응 데이터를 분석하고, 터지는 포인트(Winning Point)를 찾아내어 극대화합니다."
    }
];

export function Secret() {
    return (
        <section className="py-24 relative overflow-hidden bg-muted/20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        Secret Sauce
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        터지는 숏폼을 만드는 <span className="gradient-text">비결</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        단순히 운에 맡기지 않습니다. 철저한 분석과 검증된 노하우로 결과를 만듭니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {secrets.map((secret, index) => (
                        <div
                            key={index}
                            className="glass-strong p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Background Icon Decoration */}
                            <div className="absolute -right-4 -top-4 text-primary/5 rotate-12 transform scale-150 group-hover:scale-175 transition-transform duration-500">
                                {secret.icon}
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                {secret.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3">{secret.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                {secret.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
