"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ChevronDown } from "lucide-react";

interface VideoItem {
    id: string;
    category: string;
    thumbnail: string;
    tiktokId?: string;
}

const allVideos: VideoItem[] = [
    // 제품
    {
        id: "1",
        category: "product",
        thumbnail: "/videos/1.png",
        tiktokId: "7581463122439851271",
    },
    {
        id: "2",
        category: "product",
        thumbnail: "/videos/2.png",
        tiktokId: "7581459730695032082",
    },
    // 뷰티
    {
        id: "3",
        category: "beauty",
        thumbnail: "/videos/3.png",
        tiktokId: "7576579509550451986",
    },
    {
        id: "4",
        category: "beauty",
        thumbnail: "/videos/4.png",
        tiktokId: "7579184489738308872",
    },
    // 엔터
    {
        id: "5",
        category: "entertainment",
        thumbnail: "/videos/5.png",
        tiktokId: "7576140902012374279",
    },
    // 교육
    {
        id: "6",
        category: "education",
        thumbnail: "/videos/6.png",
        tiktokId: "7582836034237467911",
    },
    {
        id: "7",
        category: "education",
        thumbnail: "/videos/7.png",
        tiktokId: "7580001962708520212",
    },
    // 게임
    {
        id: "8",
        category: "game",
        thumbnail: "/videos/8.png",
        tiktokId: "7582955011546647828",
    },
    {
        id: "9",
        category: "game",
        thumbnail: "/videos/9.png",
        tiktokId: "7539751568434908424",
    },
    // 패션
    {
        id: "10",
        category: "fashion",
        thumbnail: "/videos/10.png",
        tiktokId: "7572584770702527766",
    },
    {
        id: "11",
        category: "fashion",
        thumbnail: "/videos/11.png",
        tiktokId: "7579824322739555592",
    },
    {
        id: "12",
        category: "fashion",
        thumbnail: "/videos/12.png",
        tiktokId: "7579817203294375175",
    },
    // 푸드
    {
        id: "13",
        category: "food",
        thumbnail: "/videos/13.png",
        tiktokId: "7581633890423426321",
    },
    {
        id: "14",
        category: "food",
        thumbnail: "/videos/14.png",
        tiktokId: "7582400649556430101",
    },
    // 기타
    {
        id: "15",
        category: "etc",
        thumbnail: "/videos/15.png",
        tiktokId: "7581452995284487432",
    },
    {
        id: "16",
        category: "etc",
        thumbnail: "/videos/15.png", // 15번 이미지 재사용
        tiktokId: "7582020495252409608",
    },
];

const categories = [
    { id: "all", label: "전체" },
    { id: "product", label: "제품" },
    { id: "beauty", label: "뷰티" },
    { id: "entertainment", label: "엔터" },
    { id: "education", label: "교육" },
    { id: "game", label: "게임" },
    { id: "fashion", label: "패션" },
    { id: "food", label: "푸드" },
    { id: "etc", label: "기타" },
];

const INITIAL_COUNT = 6;

function TikTokEmbed({ videoId }: { videoId: string }) {
    // TikTok iframe embed with autoplay
    const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}?autoplay=1`;

    return (
        <div className="flex justify-center">
            <div className="relative w-full max-w-[325px] aspect-[9/16] rounded-xl overflow-hidden bg-black">
                <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
}

function VideoCard({ video, onClick }: { video: VideoItem; onClick: () => void }) {
    const hasTikTok = video.tiktokId;

    return (
        <div
            className={`group relative rounded-2xl overflow-hidden glass hover-lift ${hasTikTok ? "cursor-pointer" : ""}`}
            onClick={hasTikTok ? onClick : undefined}
        >
            <div className="aspect-[9/16] relative">
                {/* Thumbnail Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-muted"
                    style={{
                        backgroundImage: `url(${video.thumbnail})`,
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/50 text-white border-none text-xs">
                        {categories.find(c => c.id === video.category)?.label}
                    </Badge>
                </div>
            </div>
        </div>
    );
}

export function Portfolio() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [showCount, setShowCount] = useState(INITIAL_COUNT);
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

    const filteredVideos = activeCategory === "all"
        ? allVideos
        : allVideos.filter(v => v.category === activeCategory);

    const visibleVideos = filteredVideos.slice(0, showCount);
    const hasMore = showCount < filteredVideos.length;

    const handleLoadMore = () => {
        setShowCount(prev => prev + 6);
    };

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setShowCount(INITIAL_COUNT);
    };

    return (
        <section id="portfolio" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2">
                        포트폴리오
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        다양한 <span className="gradient-text">제작 타입</span>을 확인하세요
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        제품, 브랜드, 이벤트, 교육, AI 영상 등 다양한 유형의 숏폼을 제작합니다
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full"
                            >
                                {category.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={activeCategory} className="mt-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {visibleVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    onClick={() => setSelectedVideo(video)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {hasMore && (
                    <div className="mt-12 text-center">
                        <Button variant="outline" size="lg" onClick={handleLoadMore}>
                            더 많은 작업물 보기
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>

            {/* TikTok Video Modal */}
            <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
                <DialogContent className="max-w-lg p-0 overflow-hidden glass-strong border-border">
                    <DialogHeader className="p-4 border-b border-border">
                        <DialogTitle className="flex items-center justify-between">
                            <span>{categories.find(c => c.id === selectedVideo?.category)?.label}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        {selectedVideo?.tiktokId ? (
                            <TikTokEmbed
                                videoId={selectedVideo.tiktokId}
                            />
                        ) : (
                            <div className="aspect-[9/16] bg-muted rounded-xl flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>TikTok 영상 ID를 추가하면</p>
                                    <p>여기서 재생됩니다</p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
