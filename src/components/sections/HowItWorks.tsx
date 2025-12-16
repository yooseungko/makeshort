"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clapperboard, Rocket, ThumbsUp, Upload, Sparkles, Video, Search } from "lucide-react";

const processTypes = [
    {
        id: "provided",
        label: "원본 영상 제공형",
        description: "촬영된 영상이 있는 경우",
        steps: [
            {
                number: "01",
                icon: <Upload className="w-8 h-8" />,
                title: "영상 전달",
                description: "촬영된 원본 영상과 기획 방향을 전달해 주세요.",
            },
            {
                number: "02",
                icon: <Clapperboard className="w-8 h-8" />,
                title: "편집 & 제작",
                description: "트렌드에 맞는 컷편집, 자막, 효과를 적용합니다.",
            },
            {
                number: "03",
                icon: <ThumbsUp className="w-8 h-8" />,
                title: "피드백 & 수정",
                description: "만족하실 때까지 무제한 수정을 지원합니다.",
            },
            {
                number: "04",
                icon: <Rocket className="w-8 h-8" />,
                title: "납품 완료",
                description: "최적화된 포맷으로 납품해 드립니다.",
            },
        ],
    },
    {
        id: "notProvided",
        label: "원본 영상 미제공형",
        description: "영상 소스가 없는 경우",
        steps: [
            {
                number: "01",
                icon: <MessageSquare className="w-8 h-8" />,
                title: "기획 상담",
                description: "원하시는 콘텐츠 방향과 목표를 상담합니다.",
            },
            {
                number: "02",
                icon: <Search className="w-8 h-8" />,
                title: "소스 수집",
                description: "스톡 영상, AI 생성 등 최적의 소스를 확보합니다.",
            },
            {
                number: "03",
                icon: <Sparkles className="w-8 h-8" />,
                title: "영상 제작",
                description: "전문 편집팀이 고퀄리티 숏폼을 제작합니다.",
            },
            {
                number: "04",
                icon: <ThumbsUp className="w-8 h-8" />,
                title: "피드백 & 수정",
                description: "만족하실 때까지 무제한 수정을 지원합니다.",
            },
            {
                number: "05",
                icon: <Rocket className="w-8 h-8" />,
                title: "납품 완료",
                description: "최적화된 포맷으로 납품해 드립니다.",
            },
        ],
    },
];

export function HowItWorks() {
    const [activeType, setActiveType] = useState("provided");
    const currentProcess = processTypes.find(p => p.id === activeType)!;

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        진행 과정
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">간단한 프로세스</span>로 완성
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        복잡한 과정 없이 빠르고 간편하게 숏폼을 받아보세요
                    </p>
                </div>

                {/* Process Type Selector */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    {processTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveType(type.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeType === type.id
                                    ? "glass-strong border-primary/50"
                                    : "glass hover:bg-muted/30"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeType === type.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}>
                                {type.id === "provided" ? (
                                    <Video className="w-5 h-5" />
                                ) : (
                                    <Sparkles className="w-5 h-5" />
                                )}
                            </div>
                            <div className="text-left">
                                <div className={`font-semibold ${activeType === type.id ? "text-primary" : ""}`}>
                                    {type.label}
                                </div>
                                <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connection Line */}
                    <div className="absolute top-24 left-0 right-0 h-px bg-border hidden lg:block" />

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${currentProcess.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"
                        }`}>
                        {currentProcess.steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                <div className="glass rounded-2xl p-6 text-center hover-lift h-full">
                                    {/* Number Badge */}
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold relative z-10">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass flex items-center justify-center text-foreground/70">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>

                                {/* Arrow for desktop */}
                                {index < currentProcess.steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-24 -right-4 text-muted-foreground z-10">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
                        {activeType === "provided" ? (
                            <p>💡 원본 영상이 있으면 더 빠르고 저렴하게 제작이 가능합니다.</p>
                        ) : (
                            <p>💡 영상 소스가 없어도 걱정 마세요! AI 생성, 스톡 영상 등 다양한 방법으로 제작해 드립니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
