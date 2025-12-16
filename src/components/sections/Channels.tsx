"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Eye, Video } from "lucide-react";

interface Channel {
    name: string;
    platform: "youtube" | "tiktok" | "instagram";
    subscribers: string;
    views: string;
    videos: string;
    description: string;
    url: string;
    avatar: string;
}

const channels: Channel[] = [
    {
        name: "테크리뷰어",
        platform: "youtube",
        subscribers: "52만",
        views: "2.1억",
        videos: "340",
        description: "IT 제품 숏폼 리뷰 전문 채널",
        url: "#",
        avatar: "🎮",
    },
    {
        name: "뷰티퀸",
        platform: "tiktok",
        subscribers: "120만",
        views: "8.5억",
        videos: "890",
        description: "뷰티/화장품 바이럴 영상",
        url: "#",
        avatar: "💄",
    },
    {
        name: "푸드헌터",
        platform: "instagram",
        subscribers: "38만",
        views: "9500만",
        videos: "520",
        description: "맛집/음식 콘텐츠 전문",
        url: "#",
        avatar: "🍔",
    },
    {
        name: "라이프해커",
        platform: "youtube",
        subscribers: "89만",
        views: "3.2억",
        videos: "450",
        description: "라이프스타일/꿀팁 콘텐츠",
        url: "#",
        avatar: "💡",
    },
];

const platformNames = {
    youtube: "YouTube",
    tiktok: "TikTok",
    instagram: "Instagram",
};

export function Channels() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        파트너 채널
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        함께 성장한 <span className="gradient-text">채널들</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        저희와 함께 성장한 크리에이터와 브랜드 채널을 소개합니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {channels.map((channel) => (
                        <div
                            key={channel.name}
                            className="group hover-lift glass rounded-2xl p-6"
                        >
                            {/* Avatar & Platform */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
                                    {channel.avatar}
                                </div>
                                <Badge variant="outline">
                                    {platformNames[channel.platform]}
                                </Badge>
                            </div>

                            {/* Channel Info */}
                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                {channel.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {channel.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 rounded-lg glass">
                                    <Users className="w-4 h-4 mx-auto mb-1 text-foreground/50" />
                                    <div className="text-sm font-bold">{channel.subscribers}</div>
                                    <div className="text-xs text-muted-foreground">구독자</div>
                                </div>
                                <div className="text-center p-2 rounded-lg glass">
                                    <Eye className="w-4 h-4 mx-auto mb-1 text-foreground/50" />
                                    <div className="text-sm font-bold">{channel.views}</div>
                                    <div className="text-xs text-muted-foreground">조회수</div>
                                </div>
                                <div className="text-center p-2 rounded-lg glass">
                                    <Video className="w-4 h-4 mx-auto mb-1 text-foreground/50" />
                                    <div className="text-sm font-bold">{channel.videos}</div>
                                    <div className="text-xs text-muted-foreground">영상</div>
                                </div>
                            </div>

                            {/* CTA */}
                            <Button
                                variant="ghost"
                                className="w-full"
                                asChild
                            >
                                <a href={channel.url} target="_blank" rel="noopener noreferrer">
                                    채널 방문
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
