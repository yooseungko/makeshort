'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
    Contract,
    getContractById,
    getContractByPassword,
    signContract,
    formatCurrency,
    formatDate
} from '@/lib/contracts';
import { Button } from '@/components/ui/button';
import { FileText, PenTool, CheckCircle, Lock, Eye, ArrowLeft, User, Check, Loader2 } from 'lucide-react';

type ViewMode = 'loading' | 'login' | 'menu' | 'quote' | 'contract' | 'sign' | 'complete';

export default function ContractPage() {
    const params = useParams();
    const contractId = params.id as string;

    const [contract, setContract] = useState<Contract | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('loading');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showContractConfirmModal, setShowContractConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Signature canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        // 계약서 로드
        const loadContract = async () => {
            const loadedContract = await getContractById(contractId);
            if (loadedContract) {
                setContract(loadedContract);

                // 이미 서명된 계약서면 완료 화면으로
                const currentVersion = loadedContract.versions.find(v => v.version === loadedContract.currentVersion);
                if (currentVersion?.status === 'signed') {
                    setViewMode('complete');
                } else {
                    setViewMode('login');
                }
            } else {
                setViewMode('login');
            }
        };
        loadContract();
    }, [contractId]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contract) return;

        if (password.toUpperCase() === contract.password) {
            const currentVersion = contract.versions.find(v => v.version === contract.currentVersion);
            if (currentVersion?.status === 'signed') {
                setViewMode('complete');
            } else {
                setViewMode('menu');
            }
            setPasswordError('');
        } else {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        }
    };

    // Canvas drawing functions
    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            e.preventDefault();
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    const handleSignContract = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !contract) return;

        setIsSubmitting(true);
        try {
            const signatureData = canvas.toDataURL('image/png');
            await signContract(contract.id, signatureData);

            // 계약서 다시 로드
            const updatedContract = await getContractById(contract.id);
            if (updatedContract) {
                setContract(updatedContract);
            }

            setViewMode('complete');
        } catch (error) {
            console.error('Error signing contract:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 로딩 화면
    if (viewMode === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto text-violet-400 animate-spin mb-4" />
                    <p className="text-slate-400">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!contract) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <Lock className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                    <h1 className="text-xl font-bold text-white mb-2">계약서를 찾을 수 없습니다</h1>
                    <p className="text-slate-400">올바른 링크인지 확인해주세요.</p>
                </div>
            </div>
        );
    }

    const currentVersion = contract.versions.find(v => v.version === contract.currentVersion);
    if (!currentVersion) return null;

    // 비밀번호 입력 화면 (고객 로그인)
    if (viewMode === 'login') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">고객 로그인</h1>
                            <p className="text-slate-400">비밀번호를 입력해주세요</p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.toUpperCase())}
                                className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-center text-2xl tracking-widest font-mono focus:border-violet-500 focus:outline-none uppercase"
                                placeholder="******"
                                maxLength={6}
                            />
                            {passwordError && (
                                <p className="text-red-400 text-sm text-center">{passwordError}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl"
                            >
                                로그인
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // 메뉴 화면
    if (viewMode === 'menu') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {currentVersion.customerInfo.companyName}
                        </h1>
                        <p className="text-slate-400">아래에서 원하시는 메뉴를 선택해주세요</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => setViewMode('quote')}
                            className="w-full p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-violet-500/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                    <Eye className="w-7 h-7 text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-white">최종 견적 보기</h3>
                                    <p className="text-sm text-slate-400">견적 내용을 확인합니다</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setViewMode('contract')}
                            className="w-full p-6 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-500/30 rounded-2xl hover:border-violet-500/50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-violet-500/20 rounded-xl flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                                    <PenTool className="w-7 h-7 text-violet-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-white">계약하기</h3>
                                    <p className="text-sm text-slate-400">계약서를 확인하고 서명합니다</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 견적 보기 화면
    if (viewMode === 'quote') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={() => setViewMode('menu')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        돌아가기
                    </button>

                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
                            <h1 className="text-xl font-bold text-white">견적서</h1>
                            <p className="text-violet-200">{currentVersion.customerInfo.companyName}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* 고객 정보 */}
                            <div>
                                <h3 className="text-sm font-medium text-slate-400 mb-3">고객 정보</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">기업명</span>
                                        <span className="text-white">{currentVersion.customerInfo.companyName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">대표자</span>
                                        <span className="text-white">{currentVersion.customerInfo.representativeName}</span>
                                    </div>
                                    {currentVersion.customerInfo.businessNumber && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">사업자번호</span>
                                            <span className="text-white">{currentVersion.customerInfo.businessNumber}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 견적 항목 */}
                            <div>
                                <h3 className="text-sm font-medium text-slate-400 mb-3">견적 항목</h3>
                                <div className="space-y-3">
                                    {currentVersion.quoteItems.map((item, index) => (
                                        <div key={item.id} className="bg-slate-900/50 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-white font-medium">{item.description}</span>
                                                <span className="text-violet-400 font-semibold">{formatCurrency(item.amount)}</span>
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                수량 {item.quantity}개 × 단가 {formatCurrency(item.unitPrice)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 결제 일정 */}
                            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-violet-400 mb-3">결제 일정</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">선금 (계약금)</span>
                                        <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.deposit)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">중도금</span>
                                        <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.interim)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">잔금</span>
                                        <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.balance)}</span>
                                    </div>
                                    <div className="border-t border-violet-500/30 pt-2 mt-2 flex justify-between">
                                        <span className="text-white font-semibold">총액</span>
                                        <span className="text-xl font-bold text-violet-400">{formatCurrency(currentVersion.paymentSchedule.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 견적 확정 버튼 */}
                            <Button
                                onClick={() => setShowContractConfirmModal(true)}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl"
                            >
                                <Check className="w-5 h-5 mr-2" />
                                견적 확정
                            </Button>

                            {/* 기업 정보 (회사 정보) */}
                            <div className="pt-4 border-t border-slate-700/50">
                                <div className="text-center mb-3">
                                    <p className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        메이크숏
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        MAKESHORT
                                    </p>
                                </div>
                                <div className="text-center text-xs text-slate-500 space-y-1">
                                    <p>테넷컴퍼니 | 대표 고유승, 고유진</p>
                                    <p>사업자등록번호 654-11-02475</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 계약 확인 모달 */}
                {showContractConfirmModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <PenTool className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">계약을 진행하시겠습니까?</h2>
                                <p className="text-slate-400 text-sm">
                                    견적 내용을 확인하셨다면, 계약 프로세스를 시작합니다.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setShowContractConfirmModal(false)}
                                    variant="outline"
                                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                    아니오
                                </Button>
                                <Button
                                    onClick={() => {
                                        setShowContractConfirmModal(false);
                                        setViewMode('contract');
                                    }}
                                    className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                                >
                                    예, 계약하기
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // 계약서 확인 화면
    if (viewMode === 'contract') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={() => setViewMode('menu')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        돌아가기
                    </button>

                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
                            <h1 className="text-xl font-bold text-white">계약서</h1>
                            <p className="text-violet-200">{currentVersion.customerInfo.companyName}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* 계약 당사자 */}
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-slate-400 mb-3">계약 당사자</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="text-slate-500">발주자 (갑)</span>
                                        <div className="mt-1 space-y-1">
                                            <p className="text-white font-medium">{currentVersion.customerInfo.companyName}</p>
                                            <p className="text-slate-300">대표자: {currentVersion.customerInfo.representativeName}</p>
                                            {currentVersion.customerInfo.businessNumber && (
                                                <p className="text-slate-300">사업자번호: {currentVersion.customerInfo.businessNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">수급자 (을)</span>
                                        <div className="mt-1 space-y-1">
                                            <p className="text-white font-medium">테넷컴퍼니 (메이크숏)</p>
                                            <p className="text-slate-300">대표자: 고유진, 고유승</p>
                                            <p className="text-slate-300">사업자번호: 654-11-02475</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 계약 금액 */}
                            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-violet-400 mb-2">계약 금액</h3>
                                <p className="text-2xl font-bold text-white">{formatCurrency(currentVersion.paymentSchedule.total)}</p>
                            </div>

                            {/* 계약 조항 */}
                            <div>
                                <h3 className="text-sm font-medium text-slate-400 mb-3">계약 조항</h3>
                                <div className="bg-slate-900/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                                        {currentVersion.contractTerms}
                                    </pre>
                                </div>
                            </div>

                            <Button
                                onClick={() => setViewMode('sign')}
                                className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl"
                            >
                                <PenTool className="w-5 h-5 mr-2" />
                                서명하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 서명 화면
    if (viewMode === 'sign') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={() => setViewMode('contract')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        돌아가기
                    </button>

                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                        <h1 className="text-xl font-bold text-white mb-2 text-center">서명</h1>
                        <p className="text-slate-400 text-center text-sm mb-6">
                            아래 영역에 손가락으로 서명해주세요
                        </p>

                        <div className="relative">
                            <canvas
                                ref={canvasRef}
                                width={350}
                                height={200}
                                className="w-full bg-white rounded-xl cursor-crosshair touch-none"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                            />
                            {!hasSignature && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <p className="text-slate-400 text-sm">여기에 서명하세요</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                onClick={clearSignature}
                                variant="outline"
                                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                                지우기
                            </Button>
                            <Button
                                onClick={handleSignContract}
                                disabled={!hasSignature}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
                            >
                                계약 완료
                            </Button>
                        </div>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            서명을 완료하면 계약에 동의하는 것으로 간주됩니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // 완료 화면
    if (viewMode === 'complete') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div className="max-w-lg mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                        {/* 완료 헤더 */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">계약 완료되었습니다</h1>
                            <p className="text-green-100">
                                {currentVersion.signature?.signedAt && formatDate(currentVersion.signature.signedAt)}
                            </p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* 계약 정보 */}
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-slate-400 mb-3">계약 정보</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">기업명</span>
                                        <span className="text-white">{currentVersion.customerInfo.companyName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">대표자</span>
                                        <span className="text-white">{currentVersion.customerInfo.representativeName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">계약 금액</span>
                                        <span className="text-violet-400 font-semibold">{formatCurrency(currentVersion.paymentSchedule.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 결제 일정 */}
                            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-violet-400 mb-3">결제 일정</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">선금</span>
                                            <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.deposit)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">계약 후 즉시 입금</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">중도금</span>
                                            <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.interim)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">협의된 일정으로 입금</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">잔금</span>
                                            <span className="text-white">{formatCurrency(currentVersion.paymentSchedule.balance)}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">협의된 일정으로 입금</p>
                                    </div>
                                    <div className="border-t border-violet-500/30 pt-2 mt-2 flex justify-between">
                                        <span className="text-white font-semibold">총액</span>
                                        <span className="text-xl font-bold text-violet-400">{formatCurrency(currentVersion.paymentSchedule.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 입금 안내 */}
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-blue-400 mb-3">💳 입금 안내</h3>
                                <div className="text-center">
                                    <p className="text-slate-300 text-sm mb-2">아래 계좌로 입금해주세요</p>
                                    <div className="bg-slate-900/50 rounded-lg p-3 inline-block">
                                        <p className="text-white font-bold text-lg">하나은행</p>
                                        <p className="text-violet-400 font-mono text-xl tracking-wider">21891001581804</p>
                                        <p className="text-slate-300">예금주: 고유승</p>
                                    </div>
                                </div>
                            </div>

                            {/* 서명 이미지 */}
                            {currentVersion.signature && (
                                <div>
                                    <h3 className="text-sm font-medium text-slate-400 mb-3">고객 서명</h3>
                                    <div className="bg-white rounded-xl p-4">
                                        <img
                                            src={currentVersion.signature.signatureData}
                                            alt="서명"
                                            className="max-h-32 mx-auto"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 견적 보기 버튼 */}
                            <Button
                                onClick={() => setViewMode('quote')}
                                variant="outline"
                                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                                <Eye className="w-5 h-5 mr-2" />
                                견적 내용 보기
                            </Button>

                            {/* 법적 고지 */}
                            <div className="pt-4 border-t border-slate-700/50">
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    본 온라인계약서는 전자서명법(제4조의2)에 의거 전자서명도 서명, 서명날인, 기명날인으로서의 효력이 부인되지 않으며, 법령이나 당사자 간 약정에 따라 선택된 경우 서면과 동일한 효력을 가집니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
