"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Eye, Video, Users } from "lucide-react";

interface StatItemProps {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    delay: number;
}

function StatItem({ icon, value, suffix, label, delay }: StatItemProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(counter);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(counter);
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
        <div
            ref={ref}
            className="glass rounded-2xl p-8 text-center hover-lift"
        >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass flex items-center justify-center">
                {icon}
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-muted-foreground">{label}</div>
        </div>
    );
}

export function Stats() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        숫자가 증명하는 <span className="gradient-text">성과</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        실제 클라이언트 데이터를 기반으로 한 우리의 결과물입니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatItem
                        icon={<Eye className="w-8 h-8 text-foreground/70" />}
                        value={5000}
                        suffix="만+"
                        label="누적 조회수"
                        delay={0}
                    />
                    <StatItem
                        icon={<Video className="w-8 h-8 text-foreground/70" />}
                        value={1200}
                        suffix="+"
                        label="제작 영상 수"
                        delay={200}
                    />
                    <StatItem
                        icon={<TrendingUp className="w-8 h-8 text-foreground/70" />}
                        value={92}
                        suffix="%"
                        label="만족도"
                        delay={400}
                    />
                    <StatItem
                        icon={<Users className="w-8 h-8 text-foreground/70" />}
                        value={350}
                        suffix="+"
                        label="파트너사"
                        delay={600}
                    />
                </div>
            </div>
        </section>
    );
}
