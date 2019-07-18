export interface CardInfo{
    issuer: CardIssuerInfo,
    mainAccount: string
}

export interface CardIssuerInfo{
    id: string,
    label: string
}