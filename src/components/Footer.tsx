import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="py-12 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold gradient-text mb-4">MakeShort</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md">
                            터지는 숏폼을 만들어 드립니다. 고정 단가, 검증된 퀄리티로
                            여러분의 콘텐츠를 바이럴 시켜 드립니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">베이직 편집</a></li>
                            <li><a href="#" className="hover:text-foreground">스탠다드 편집</a></li>
                            <li><a href="#" className="hover:text-foreground">AI 프리미엄</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">문의</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>contact@makeshort.kr</li>
                            <li>카카오톡: @makeshort</li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© 2024 MakeShort. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-foreground">이용약관</a>
                        <a href="#" className="hover:text-foreground">개인정보처리방침</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
