export interface CardInfo{
    issuer: BankInfo,
    mainAccount: string
}

export interface BankInfo{
    value: string,
    label: string
}