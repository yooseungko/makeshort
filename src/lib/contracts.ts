// 계약 관련 타입 및 Supabase 연동
import { supabase } from './supabase';

export interface CustomerInfo {
    representativeName: string; // 대표자명
    businessNumber: string;     // 사업자번호
    companyName: string;        // 기업명
}

export interface QuoteItem {
    id: string;
    description: string;  // 항목 설명
    quantity: number;     // 수량
    unitPrice: number;    // 단가
    amount: number;       // 금액
}

export interface PaymentSchedule {
    total: number;       // 총액
    deposit: number;     // 선금
    interim: number;     // 중도금
    balance: number;     // 잔금
}

export interface ContractSignature {
    signatureData: string;  // Base64 서명 이미지
    signedAt: string;       // 서명 일시
    ipAddress?: string;     // IP 주소
}

export interface ContractVersion {
    version: number;
    createdAt: string;
    customerInfo: CustomerInfo;
    quoteItems: QuoteItem[];
    paymentSchedule: PaymentSchedule;
    contractTerms: string;  // 계약서 본문
    signature?: ContractSignature;
    status: 'draft' | 'pending' | 'signed' | 'cancelled';
}

export interface Contract {
    id: string;
    password: string;  // 고객 접근 비밀번호
    createdAt: string;
    updatedAt: string;
    currentVersion: number;
    versions: ContractVersion[];
}

// DB에서 가져온 데이터 타입
interface ContractRow {
    id: string;
    password: string;
    created_at: string;
    updated_at: string;
    current_version: number;
    data: {
        versions: ContractVersion[];
    };
}

// 계약서 기본 약관 템플릿
export const DEFAULT_CONTRACT_TERMS = `
제1조 (목적)
본 계약은 발주자(이하 "갑"이라 한다)와 수급자(이하 "을"이라 한다) 간의 영상 제작 및 편집 용역에 관한 권리와 의무를 규정함을 목적으로 한다.

제2조 (용역의 범위)
1. "을"이 "갑"에게 제공하는 용역의 내용은 첨부된 견적서의 상세 내역과 같다.
2. 용역의 범위에는 다음 사항이 포함된다.
   - 영상 기획 및 콘티 구성
   - 촬영 (필요시)
   - 영상 편집 및 후반 작업
   - 자막, 효과음, BGM 삽입
   - 컬러 그레이딩 및 색보정
3. 견적서에 명시되지 않은 추가 작업은 별도 협의 후 진행한다.

제3조 (계약 금액 및 지급 방법)
1. 계약 금액은 첨부된 견적서에 명시된 금액으로 하며, 부가가치세는 별도이다.
2. 지급 방법은 다음과 같다.
   - 선금: 본 계약 체결 후 즉시 (작업 착수 전 입금 완료)
   - 중도금: 1차 편집본 확인 후 협의된 일정에 따라
   - 잔금: 최종 결과물 납품 완료 시
3. "갑"이 대금 지급을 지연할 경우, "을"은 작업을 중단할 수 있다.

제4조 (작업 일정 및 납품)
1. "을"은 계약 체결 후 협의된 일정에 따라 작업을 진행한다.
2. 납품 형식은 다음과 같다.
   - 영상 파일: MP4 (H.264 코덱, 1080p 또는 협의된 해상도)
   - 숏폼 영상: 세로형 9:16 비율 (인스타그램, 틱톡, 유튜브 쇼츠용)
   - 기타 형식이 필요한 경우 사전 협의
3. 납품은 클라우드 링크(구글 드라이브, 네이버 MYBOX 등) 또는 협의된 방법으로 전달한다.

제5조 (수정 및 보완)
1. "갑"은 1차 편집본 확인 후 수정을 요청할 수 있으며, 기본 수정 횟수는 2회로 한다.
2. 기본 수정 범위는 다음과 같다.
   - 자막 수정 (오탈자, 문구 변경)
   - 컷 순서 변경 및 삭제
   - BGM 변경 (저작권 프리 음원 내)
   - 간단한 효과 추가/수정
3. 다음 사항은 추가 비용이 발생한다.
   - 3회 이상의 수정 요청
   - 콘셉트 또는 전체 구성 변경
   - 새로운 촬영 추가
   - 3D 그래픽, 애니메이션 추가
   - 납품 완료 후 재편집 요청
4. 추가 비용은 작업량에 따라 "을"이 산정하며, "갑"의 동의 후 진행한다.

제6조 (소스 제공 및 협조)
1. "갑"은 영상 제작에 필요한 소스(로고, 이미지, 영상 클립, 제품 정보 등)를 적시에 제공하여야 한다.
2. 소스 제공 지연으로 인한 납품 일정 지연에 대해 "을"은 책임지지 않는다.
3. "갑"이 제공한 소스의 저작권 문제에 대한 책임은 "갑"에게 있다.

제7조 (저작권 및 사용권)
1. 최종 납품된 결과물의 저작재산권은 잔금 완납 시 "갑"에게 이전된다.
2. "을"은 포트폴리오, 홍보, 마케팅 목적으로 결과물을 사용할 수 있다. 단, "갑"의 요청 시 사용을 제한할 수 있다.
3. 편집 프로젝트 파일(소스 파일)은 별도 협의가 없는 한 납품 대상에 포함되지 않는다.
4. 사용된 폰트, BGM, 효과음 등의 라이선스는 "을"이 보유한 범위 내에서 적용된다.

제8조 (비밀유지)
1. 양 당사자는 본 계약과 관련하여 알게 된 상대방의 비밀정보를 제3자에게 누설하지 않는다.
2. 미공개 제품, 서비스, 마케팅 전략 등 기밀 정보가 포함된 경우 특별히 유의한다.

제9조 (계약의 해지 및 환불)
1. "갑"의 사정으로 계약을 해지하는 경우:
   - 작업 착수 전: 선금의 50% 환불
   - 1차 편집본 제출 전: 선금 환불 불가, 중도금 미청구
   - 1차 편집본 제출 후: 기 지급 금액 환불 불가
2. "을"의 사정으로 계약을 해지하는 경우:
   - 기 지급 금액 전액 환불
3. 천재지변, 불가항력으로 인한 해지 시 쌍방 협의하여 처리한다.

제10조 (손해배상)
1. 일방 당사자가 본 계약을 위반하여 상대방에게 손해를 끼친 경우, 그 손해를 배상하여야 한다.
2. 단, 손해배상 금액은 계약 금액을 초과하지 않는다.

제11조 (분쟁 해결)
1. 본 계약에 관한 분쟁은 당사자 간 협의로 해결한다.
2. 협의가 이루어지지 않을 경우, 서울중앙지방법원을 관할 법원으로 한다.

제12조 (기타)
1. 본 계약에 명시되지 않은 사항은 관계 법령 및 상관례에 따른다.
2. 본 계약의 변경은 양 당사자의 서면 합의에 의해서만 효력을 가진다.
`.trim();

// Row를 Contract로 변환
function rowToContract(row: ContractRow): Contract {
    return {
        id: row.id,
        password: row.password,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        currentVersion: row.current_version,
        versions: row.data.versions
    };
}

// 모든 계약 조회
export async function getAllContracts(): Promise<Contract[]> {
    const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching contracts:', error);
        return [];
    }

    return (data || []).map(rowToContract);
}

// 계약 ID로 조회
export async function getContractById(id: string): Promise<Contract | null> {
    const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching contract:', error);
        return null;
    }

    return data ? rowToContract(data) : null;
}

// 비밀번호로 계약 조회
export async function getContractByPassword(password: string): Promise<Contract | null> {
    const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('password', password)
        .single();

    if (error) {
        console.error('Error fetching contract by password:', error);
        return null;
    }

    return data ? rowToContract(data) : null;
}

// 새 계약 생성
export async function createContract(
    customerInfo: CustomerInfo,
    quoteItems: QuoteItem[],
    paymentSchedule: PaymentSchedule,
    contractTerms: string
): Promise<Contract | null> {
    const id = generateId();
    const password = generatePassword();
    const now = new Date().toISOString();

    const version: ContractVersion = {
        version: 1,
        createdAt: now,
        customerInfo,
        quoteItems,
        paymentSchedule,
        contractTerms,
        status: 'pending'
    };

    const { data, error } = await supabase
        .from('contracts')
        .insert({
            id,
            password,
            created_at: now,
            updated_at: now,
            current_version: 1,
            data: { versions: [version] }
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating contract:', error);
        return null;
    }

    return data ? rowToContract(data) : null;
}

// 계약 업데이트 (새 버전 생성)
export async function updateContract(
    id: string,
    customerInfo: CustomerInfo,
    quoteItems: QuoteItem[],
    paymentSchedule: PaymentSchedule,
    contractTerms: string
): Promise<Contract | null> {
    // 먼저 기존 계약 조회
    const existing = await getContractById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const newVersion = existing.currentVersion + 1;

    const version: ContractVersion = {
        version: newVersion,
        createdAt: now,
        customerInfo,
        quoteItems,
        paymentSchedule,
        contractTerms,
        status: 'pending'
    };

    const updatedVersions = [...existing.versions, version];

    const { data, error } = await supabase
        .from('contracts')
        .update({
            updated_at: now,
            current_version: newVersion,
            data: { versions: updatedVersions }
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating contract:', error);
        return null;
    }

    return data ? rowToContract(data) : null;
}

// 계약 서명
export async function signContract(id: string, signatureData: string): Promise<Contract | null> {
    // 먼저 기존 계약 조회
    const existing = await getContractById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const currentVersionIndex = existing.versions.findIndex(
        v => v.version === existing.currentVersion
    );

    if (currentVersionIndex === -1) return null;

    // 현재 버전에 서명 추가
    existing.versions[currentVersionIndex].signature = {
        signatureData,
        signedAt: now
    };
    existing.versions[currentVersionIndex].status = 'signed';

    const { data, error } = await supabase
        .from('contracts')
        .update({
            updated_at: now,
            data: { versions: existing.versions }
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error signing contract:', error);
        return null;
    }

    return data ? rowToContract(data) : null;
}

// 계약 삭제
export async function deleteContract(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting contract:', error);
        return false;
    }

    return true;
}

// 유틸리티 함수
function generateId(): string {
    return 'c_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function generatePassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// 금액 포맷팅
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

// 날짜 포맷팅
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}
