export interface CardInfo{
    issuer: BankInfo,
    mainAccount: string
}

export interface BankInfo{
    value: string,
    label: string
}

export interface TransData {
    transDate?: string;
    transTime?: string;
    transType?: string;
    transSerial?: string;
    issuerBank?: BankInfo;
    issuerAccount?: string;
    transBank?: BankInfo;
    transAccount?: string;
    amount?: string;
    balance?: string;
    returnCode?: string;
    transResult?: string;
    tac?: string;
}