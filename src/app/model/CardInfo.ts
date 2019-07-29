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

/**
 * * tx_code: 交易代碼 餘額查詢:"6000"
 * * issuer_id: 發卡行代號, 晶片金融卡中所記載的發卡行代號 格式範例:"00600000", 前三碼為銀行代號 後5碼補0
 * * issuer_account: 發卡行帳號 晶片金融卡中所記載的發卡行帳號 格式範例: "0020481000324525" , 總長度為16碼 若帳號不足16碼則右靠左補0至16碼
 * * issuer_remark: 備註欄 晶片金融卡中所記載的備註欄 格式範例: " 303030303030333030353132303034383131….",
 * * atm_checkcode: 查核碼 端末設備查核碼 格式範例: "075A7611", 八碼隨便帶
 * * icc_no: 交易序號 晶片金融卡壓碼後所產生的交易序號 格式範例: "00000112"
 * * tsac: TAC 查詢卡片餘額的押碼值 格式範例: "77FD1139BA72885D", 壓碼的明文為 tx_code + atm_checkcode + issuer_account 共28bytes
 */
export interface InquiryTelegramData {
  tx_code?: string; 
  issuer_id?: string;
  issuer_account?: string; 
  issuer_remark?: string; 
  atm_checkcode?: string; 
  icc_no?: string; 
  tsac?: string; 
}

export interface InquiryTelegramResponseData {
  result: string;
  errorCode: number;
  amount: string;
}



declare namespace hitrust {
    namespace plugins{
        export interface CardReader{
            isReaderExisted(successCallback: (isReaderExisted: boolean) => void, errorCallback: (error: any) => void);
        }
    }
}

export declare var cardReader: hitrust.plugins.CardReader;

