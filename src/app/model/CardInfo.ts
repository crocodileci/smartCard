export interface CardInfo {
  issuer: BankInfo,
    mainAccount: string
}

export interface BankInfo {
  value: string,
    label: string
}

export interface TransData {
  userId: string,
  caseId: string,
  actionId: string,
  transDate ? : string;
  transTime ? : string;
  transType ? : string;
  transSerial ? : string;
  issuerBank ? : BankInfo;
  issuerAccount ? : string;
  transBank ? : BankInfo;
  transAccount ? : string;
  amount ? : string;
  balance ? : string;
  returnCode ? : string;
  transResult ? : string;
  tac ? : string;
  serial ? : string;
}

declare namespace hitrust {
    namespace plugins{
        export interface CardReader{
            isReaderExisted(successCallback: (isReaderExisted: boolean) => void, errorCallback: (error: any) => void);
        }
    }
}

export declare var cardReader: hitrust.plugins.CardReader;

