export interface CardInfo{
    issuer: BankInfo,
    mainAccount: string
}

export interface BankInfo{
    value: string,
    label: string
}

export interface TransData {
    issuerBank?: BankInfo;
    issuerAccount?: string;
    transBank?: BankInfo;
    transAccount?: string;
    amount?: string;
    tac?: string;
}