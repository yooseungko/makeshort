'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Contract,
    CustomerInfo,
    QuoteItem,
    PaymentSchedule,
    createContract,
    updateContract,
    DEFAULT_CONTRACT_TERMS,
    formatCurrency,
} from '@/lib/contracts';
import { Plus, Trash2, X } from 'lucide-react';

interface ContractFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingContract: Contract | null;
}

export function ContractFormModal({ isOpen, onClose, editingContract }: ContractFormModalProps) {
    const [step, setStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        representativeName: '',
        businessNumber: '',
        companyName: '',
    });
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
    const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule>({
        total: 0,
        deposit: 0,
        interim: 0,
        balance: 0,
    });
    const [contractTerms, setContractTerms] = useState(DEFAULT_CONTRACT_TERMS);

    useEffect(() => {
        if (editingContract) {
            const currentVersion = editingContract.versions.find(
                (v) => v.version === editingContract.currentVersion
            );
            if (currentVersion) {
                setCustomerInfo(currentVersion.customerInfo);
                setQuoteItems(currentVersion.quoteItems);
                setPaymentSchedule(currentVersion.paymentSchedule);
                setContractTerms(currentVersion.contractTerms);
            }
        } else {
            resetForm();
        }
    }, [editingContract, isOpen]);

    const resetForm = () => {
        setStep(1);
        setCustomerInfo({
            representativeName: '',
            businessNumber: '',
            companyName: '',
        });
        setQuoteItems([]);
        setPaymentSchedule({
            total: 0,
            deposit: 0,
            interim: 0,
            balance: 0,
        });
        setContractTerms(DEFAULT_CONTRACT_TERMS);
    };

    const addQuoteItem = () => {
        const newItem: QuoteItem = {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            unitPrice: 0,
            amount: 0,
        };
        setQuoteItems([...quoteItems, newItem]);
    };

    const updateQuoteItem = (index: number, field: keyof QuoteItem, value: string | number) => {
        const updated = [...quoteItems];
        updated[index] = { ...updated[index], [field]: value };

        // 자동 금액 계산
        if (field === 'quantity' || field === 'unitPrice') {
            updated[index].amount = updated[index].quantity * updated[index].unitPrice;
        }

        setQuoteItems(updated);

        // 총액 자동 계산
        const total = updated.reduce((sum, item) => sum + item.amount, 0);
        setPaymentSchedule(prev => ({ ...prev, total }));
    };

    const removeQuoteItem = (index: number) => {
        const updated = quoteItems.filter((_, i) => i !== index);
        setQuoteItems(updated);

        const total = updated.reduce((sum, item) => sum + item.amount, 0);
        setPaymentSchedule(prev => ({ ...prev, total }));
    };

    const handlePaymentChange = (field: keyof PaymentSchedule, value: number) => {
        setPaymentSchedule(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (editingContract) {
            await updateContract(
                editingContract.id,
                customerInfo,
                quoteItems,
                paymentSchedule,
                contractTerms
            );
        } else {
            await createContract(customerInfo, quoteItems, paymentSchedule, contractTerms);
        }
        onClose();
    };

    const isStep1Valid = customerInfo.representativeName && customerInfo.companyName;
    const isStep2Valid = quoteItems.length > 0 && quoteItems.every(item => item.description && item.amount > 0);
    const isStep3Valid = paymentSchedule.total > 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        {editingContract ? '계약서 수정' : '새 계약서 생성'}
                        {editingContract && (
                            <span className="ml-2 text-sm font-normal text-violet-400">
                                (v{editingContract.currentVersion + 1} 생성)
                            </span>
                        )}
                    </DialogTitle>
                </DialogHeader>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step >= s
                                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                                    : 'bg-slate-700 text-slate-400'
                                    }`}
                            >
                                {s}
                            </div>
                            {s < 4 && (
                                <div
                                    className={`w-12 h-0.5 ${step > s ? 'bg-violet-500' : 'bg-slate-700'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 1: Customer Info */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">고객 정보</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                기업명 *
                            </label>
                            <input
                                type="text"
                                value={customerInfo.companyName}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, companyName: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                placeholder="(주)회사명"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                대표자명 *
                            </label>
                            <input
                                type="text"
                                value={customerInfo.representativeName}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, representativeName: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                placeholder="홍길동"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                사업자번호
                            </label>
                            <input
                                type="text"
                                value={customerInfo.businessNumber}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, businessNumber: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                placeholder="123-45-67890"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Quote Items */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">견적 세부 내용</h3>
                            <Button onClick={addQuoteItem} size="sm" variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                                <Plus className="w-4 h-4 mr-1" />
                                항목 추가
                            </Button>
                        </div>

                        {quoteItems.length === 0 ? (
                            <div className="text-center py-8 bg-slate-800/50 rounded-lg">
                                <p className="text-slate-400 mb-4">견적 항목을 추가해주세요</p>
                                <Button onClick={addQuoteItem} variant="outline" className="border-violet-500 text-violet-400 hover:bg-violet-500/10">
                                    <Plus className="w-4 h-4 mr-1" />
                                    첫 항목 추가
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {quoteItems.map((item, index) => (
                                    <div key={item.id} className="bg-slate-800/50 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm text-slate-400">항목 {index + 1}</span>
                                            <button
                                                onClick={() => removeQuoteItem(index)}
                                                className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => updateQuoteItem(index, 'description', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:border-violet-500 focus:outline-none"
                                                    placeholder="항목 설명"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuoteItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:border-violet-500 focus:outline-none"
                                                    placeholder="수량"
                                                    min="1"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) => updateQuoteItem(index, 'unitPrice', parseInt(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:border-violet-500 focus:outline-none"
                                                    placeholder="단가"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2 text-right">
                                            <span className="text-sm text-slate-400">금액: </span>
                                            <span className="text-violet-400 font-medium">{formatCurrency(item.amount)}</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 text-right">
                                    <span className="text-slate-300">총액: </span>
                                    <span className="text-xl font-bold text-violet-400">
                                        {formatCurrency(quoteItems.reduce((sum, item) => sum + item.amount, 0))}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Payment Schedule */}
                {step === 3 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">결제 일정</h3>

                        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mb-6">
                            <span className="text-slate-300">견적 총액: </span>
                            <span className="text-xl font-bold text-violet-400">{formatCurrency(paymentSchedule.total)}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    선금 (계약금)
                                </label>
                                <input
                                    type="number"
                                    value={paymentSchedule.deposit}
                                    onChange={(e) => handlePaymentChange('deposit', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    중도금
                                </label>
                                <input
                                    type="number"
                                    value={paymentSchedule.interim}
                                    onChange={(e) => handlePaymentChange('interim', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    잔금
                                </label>
                                <input
                                    type="number"
                                    value={paymentSchedule.balance}
                                    onChange={(e) => handlePaymentChange('balance', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-violet-500 focus:outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">입력 합계</span>
                                <span className={`font-medium ${paymentSchedule.deposit + paymentSchedule.interim + paymentSchedule.balance === paymentSchedule.total
                                    ? 'text-green-400'
                                    : 'text-yellow-400'
                                    }`}>
                                    {formatCurrency(paymentSchedule.deposit + paymentSchedule.interim + paymentSchedule.balance)}
                                </span>
                            </div>
                            {paymentSchedule.deposit + paymentSchedule.interim + paymentSchedule.balance !== paymentSchedule.total && (
                                <p className="text-xs text-yellow-400">
                                    * 선금 + 중도금 + 잔금이 총액과 일치하지 않습니다.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Contract Terms */}
                {step === 4 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">계약서 약관</h3>
                        <textarea
                            value={contractTerms}
                            onChange={(e) => setContractTerms(e.target.value)}
                            className="w-full h-64 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none resize-none"
                            placeholder="계약서 내용을 입력하세요..."
                        />
                        <p className="text-xs text-slate-500">
                            * 계약서에 포함될 약관 내용입니다. 필요에 따라 수정해주세요.
                        </p>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (step === 1) onClose();
                            else setStep(step - 1);
                        }}
                        className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                        {step === 1 ? '취소' : '이전'}
                    </Button>

                    {step < 4 ? (
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={
                                (step === 1 && !isStep1Valid) ||
                                (step === 2 && !isStep2Valid) ||
                                (step === 3 && !isStep3Valid)
                            }
                            className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 disabled:opacity-50"
                        >
                            다음
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                            {editingContract ? '새 버전 생성' : '계약서 생성'}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
