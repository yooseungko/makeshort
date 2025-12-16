"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center glass-strong rounded-3xl p-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        지금 바로 <span className="gradient-text">터지는 숏폼</span>을 시작하세요
                    </h2>

                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        무료 상담을 통해 맞춤 견적을 받아보세요.
                        첫 프로젝트는 <span className="text-primary font-semibold">20% 할인</span>!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 py-6" asChild>
                            <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                카카오톡 문의
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
