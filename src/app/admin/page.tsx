'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    Contract,
    getAllContracts,
    deleteContract,
    formatCurrency,
    formatDate,
    DEFAULT_CONTRACT_TERMS
} from '@/lib/contracts';
import { ContractFormModal } from '@/components/contract/ContractFormModal';
import { FileText, Plus, Eye, Edit, Trash2, Copy, CheckCircle, Clock, XCircle, Lock, Loader2 } from 'lucide-react';

// 관리자 비밀번호
const ADMIN_PASSWORD = 'makeshort2024';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContract, setEditingContract] = useState<Contract | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 세션 스토리지에서 인증 상태 확인
        const authStatus = sessionStorage.getItem('admin_authenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            loadContracts();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setPasswordError('');
            loadContracts();
        } else {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        }
    };

    const loadContracts = async () => {
        setIsLoading(true);
        try {
            const data = await getAllContracts();
            setContracts(data);
        } catch (error) {
            console.error('Error loading contracts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateContract = () => {
        setEditingContract(null);
        setIsModalOpen(true);
    };

    const handleEditContract = (contract: Contract) => {
        setEditingContract(contract);
        setIsModalOpen(true);
    };

    const handleDeleteContract = async (id: string) => {
        if (confirm('정말 이 계약서를 삭제하시겠습니까?')) {
            await deleteContract(id);
            loadContracts();
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingContract(null);
        loadContracts();
    };

    const copyPassword = (password: string, id: string) => {
        navigator.clipboard.writeText(password);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'signed':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        서명완료
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                        <Clock className="w-3 h-3" />
                        대기중
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                        <XCircle className="w-3 h-3" />
                        취소됨
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                        초안
                    </span>
                );
        }
    };

    const getContractLink = (id: string) => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/contract/${id}`;
        }
        return '';
    };

    // 로그인 화면
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">관리자 로그인</h1>
                            <p className="text-slate-400">비밀번호를 입력해주세요</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-center focus:border-violet-500 focus:outline-none"
                                placeholder="비밀번호 입력"
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">관리자 페이지</h1>
                    <p className="text-slate-400">계약서 및 견적서를 관리합니다.</p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="contracts" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
                        <TabsTrigger
                            value="contracts"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            계약
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
                        >
                            설정
                        </TabsTrigger>
                    </TabsList>

                    {/* 계약 탭 */}
                    <TabsContent value="contracts" className="mt-6">
                        {/* Actions */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">계약서 목록</h2>
                            <Button
                                onClick={handleCreateContract}
                                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                계약하기
                            </Button>
                        </div>

                        {/* Loading State */}
                        {isLoading ? (
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 text-center">
                                <Loader2 className="w-12 h-12 mx-auto text-violet-400 animate-spin mb-4" />
                                <p className="text-slate-400">계약서를 불러오는 중...</p>
                            </div>
                        ) : contracts.length === 0 ? (
                            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 text-center">
                                <FileText className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                                <h3 className="text-lg font-medium text-slate-300 mb-2">계약서가 없습니다</h3>
                                <p className="text-slate-500 mb-6">새로운 계약서를 생성해보세요.</p>
                                <Button
                                    onClick={handleCreateContract}
                                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    첫 계약서 만들기
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contracts.map((contract) => {
                                    const currentVersion = contract.versions.find(v => v.version === contract.currentVersion);
                                    if (!currentVersion) return null;

                                    return (
                                        <div
                                            key={contract.id}
                                            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                {/* Contract Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-white">
                                                            {currentVersion.customerInfo.companyName}
                                                        </h3>
                                                        {getStatusBadge(currentVersion.status)}
                                                        <span className="text-xs text-slate-500">
                                                            v{contract.currentVersion}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-slate-500">대표자</span>
                                                            <p className="text-slate-300">{currentVersion.customerInfo.representativeName}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">사업자번호</span>
                                                            <p className="text-slate-300">{currentVersion.customerInfo.businessNumber}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">총액</span>
                                                            <p className="text-slate-300 font-medium">{formatCurrency(currentVersion.paymentSchedule.total)}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">생성일</span>
                                                            <p className="text-slate-300">{formatDate(contract.createdAt)}</p>
                                                        </div>
                                                    </div>

                                                    {/* Password & Link */}
                                                    <div className="mt-4 flex flex-wrap items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-slate-500">비밀번호:</span>
                                                            <code className="px-2 py-1 bg-slate-700 rounded text-violet-400 font-mono text-sm">
                                                                {contract.password}
                                                            </code>
                                                            <button
                                                                onClick={() => copyPassword(contract.password, contract.id)}
                                                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                                                            >
                                                                {copiedId === contract.id ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                                ) : (
                                                                    <Copy className="w-4 h-4 text-slate-400" />
                                                                )}
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-slate-500">링크:</span>
                                                            <a
                                                                href={getContractLink(contract.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-violet-400 hover:text-violet-300 text-sm truncate max-w-[200px]"
                                                            >
                                                                {getContractLink(contract.id)}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`/contract/${contract.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-5 h-5 text-slate-300" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleEditContract(contract)}
                                                        className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                                                    >
                                                        <Edit className="w-5 h-5 text-slate-300" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteContract(contract.id)}
                                                        className="p-2 bg-slate-700/50 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5 text-red-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Version History */}
                                            {contract.versions.length > 1 && (
                                                <div className="mt-4 pt-4 border-t border-slate-700/50">
                                                    <p className="text-xs text-slate-500 mb-2">버전 기록</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {contract.versions.map((version) => (
                                                            <span
                                                                key={version.version}
                                                                className={`px-2 py-1 rounded text-xs ${version.version === contract.currentVersion
                                                                    ? 'bg-violet-500/20 text-violet-400'
                                                                    : 'bg-slate-700/50 text-slate-400'
                                                                    }`}
                                                            >
                                                                v{version.version} - {formatDate(version.createdAt)}
                                                                {version.signature && ' ✓'}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>

                    {/* 설정 탭 */}
                    <TabsContent value="settings" className="mt-6">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">기본 계약서 약관</h3>
                            <div className="bg-slate-900/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">
                                    {DEFAULT_CONTRACT_TERMS}
                                </pre>
                            </div>
                            <p className="mt-4 text-sm text-slate-500">
                                * 계약서 생성 시 위 약관이 기본으로 사용됩니다. 각 계약서별로 수정 가능합니다.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Contract Form Modal */}
            <ContractFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                editingContract={editingContract}
            />
        </div>
    );
}
