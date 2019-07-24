import {
  Component,
  OnInit
} from '@angular/core';
import {
  OnsNavigator, Params
} from 'ngx-onsenui';
import { InquiryDetailComponent } from '@app/inquiryDetail/inquiryDetail.component';
import * as ons from 'onsenui';
import { CardInfo, TransData } from '@app/model/CardInfo';
import * as moment from 'moment';

declare var hitrust: any;

@Component({
  selector: 'ons-page[inquiry]',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  isShowKeyboard = false;
  // isShowKeyboard;

  /**
   * 卡片資訊
   */
  card_info:CardInfo;

  /**
   * 卡片密碼
   */
  card_pwd = "";

  /**
   * 交易資料
   */
  transData: TransData = {
    issuerAccount: "",
    transAccount: "",
    amount: "",
    tac: "",
  };

  /**
   * 銀行資料 
   */
  bankList;

  /**
   * Constructor
   */
  constructor(private navi: OnsNavigator, private _param: Params) {
    this.card_info = _param.data;
  }

  /**
   * Initialize
   */
  ngOnInit() { 
    this.bankList = this.getBankList();

    this.transData.issuerBank = this.getBank(this.bankList, this.card_info.issuer.value);
    this.transData.issuerAccount = this.card_info.mainAccount;
    this.card_info.issuer.label = this.transData.issuerBank.label;
  }

  /**
   * Pop page
   */
  popPage() {
    this.navi.nativeElement.resetToPage(this.navi.nativeElement.page, {
      pop: "slide"
    });
  }

  inquiryProcess() {

    console.log("inquiryProcess");

    var alertOptions = {
      title: "",
      message: ""
    }

    hitrust.plugins.cardReader.verifyPin(this.card_pwd, (result:boolean)=>{

      if (result){

        let text = this.card_info.issuer.value;

        hitrust.plugins.cardReader.getTAC(text, (result)=>{

          console.log(result);

          this.transData.serial = result.serial;
          this.transData.tac = result.tac;
          console.log(this.transData);
          this.generateFakePayload(this.transData);

          this.navi.nativeElement.pushPage(InquiryDetailComponent, { 
            data: this.transData //變更結果
          });

        }, console.error);

      }else{
        alertOptions.message = '密碼驗證錯誤請重新輸入';
        ons.notification.alert(alertOptions);
      }
    }, console.error);
  }

  generateFakePayload(transData: TransData) {
    console.log("generateFakePayload");
    transData.transDate = moment().format("YYYY/MM/DD");
    transData.transTime = moment().format("HH:mm:ss");
    transData.transBank = {
      label: "",
      value: ""
    };
    transData.transAccount = "";
    transData.transType = "餘額查詢";
    transData.transSerial = "000456";
    transData.balance = "16313302";
    transData.returnCode = "0";
    transData.transResult = "交易成功";
    console.log(transData);
  }

  showNumKeyboard() {
    console.log("show keyboard");
    this.isShowKeyboard = true;
    this.card_pwd = "";
  }

  onClosekeyboardNum(e) {
    if (e) {
      this.isShowKeyboard = false;
    }
  }

  getkeyboardNumVal(e) {
    this.card_pwd = e;
  }

  getBank(bankList: Array<HTMLOptionElement>, value: string) {
    var item = bankList.filter((item, index, array) => { return item.value == value })[0];
    return item;
  }

  getBankList(): Array<HTMLOptionElement> {
    var lists = new Array();
    lists[0] = new Option('004 臺灣銀行', '004');
    lists[1] = new Option('005 土地銀行', '005');
    lists[2] = new Option('006 合庫商銀', '006');
    lists[3] = new Option('007 第一銀行', '007');
    lists[4] = new Option('008 華南銀行', '008');
    lists[5] = new Option('009 彰化銀行', '009');
    lists[6] = new Option('011 上海銀行', '011');
    lists[7] = new Option('012 台北富邦銀行', '012');
    lists[8] = new Option('013 國泰世華銀行', '013');
    lists[9] = new Option('016 高雄銀行', '016');
    lists[10] = new Option('017 兆豐國際商銀', '017');
    lists[11] = new Option('018 農業金庫', '018');
    lists[12] = new Option('020 日商瑞穗銀行', '020');
    lists[13] = new Option('021 花旗(台灣)商銀', '021');
    lists[14] = new Option('022 美國銀行', '022');
    lists[15] = new Option('025 首都銀行', '025');
    lists[16] = new Option('039 澳盛(台灣)銀行', '039');
    lists[17] = new Option('048 王道銀行', '048');
    lists[18] = new Option('050 台灣企銀', '050');
    lists[19] = new Option('052 渣打商銀', '052');
    lists[20] = new Option('053 台中商銀', '053');
    lists[21] = new Option('054 京城商銀', '054');
    lists[22] = new Option('072 德意志銀行', '072');
    lists[23] = new Option('075 東亞銀行', '075');
    lists[24] = new Option('081 匯豐(台灣)銀行', '081');
    lists[25] = new Option('082 巴黎銀行', '082');
    lists[26] = new Option('098 日商三菱日聯銀行', '098');
    lists[27] = new Option('101 瑞興銀行', '101');
    lists[28] = new Option('102 華泰銀行', '102');
    lists[29] = new Option('103 臺灣新光商銀', '103');
    lists[30] = new Option('104 台北五信', '104');
    lists[31] = new Option('106 台北九信', '106');
    lists[32] = new Option('108 陽信銀行', '108');
    lists[33] = new Option('114 基隆一信', '114');
    lists[34] = new Option('115 基隆二信', '115');
    lists[35] = new Option('118 板信銀行', '118');
    lists[36] = new Option('119 淡水一信', '119');
    lists[37] = new Option('120 淡水信合社', '120');
    lists[38] = new Option('124 宜蘭信合社', '124');
    lists[39] = new Option('127 桃園信合社', '127');
    lists[40] = new Option('130 新竹一信', '130');
    lists[41] = new Option('132 新竹三信', '132');
    lists[42] = new Option('146 台中二信', '146');
    lists[43] = new Option('147 三信銀行', '147');
    lists[44] = new Option('158 彰化一信', '158');
    lists[45] = new Option('161 彰化五信', '161');
    lists[46] = new Option('162 彰化六信', '162');
    lists[47] = new Option('163 彰化十信', '163');
    lists[48] = new Option('165 鹿港信合社', '165');
    lists[49] = new Option('178 嘉義三信', '178');
    lists[50] = new Option('179 嘉義四信', '179');
    lists[51] = new Option('188 台南三信', '188');
    lists[52] = new Option('204 高雄三信', '204');
    lists[53] = new Option('215 花蓮一信', '215');
    lists[54] = new Option('216 花蓮二信', '216');
    lists[55] = new Option('222 澎湖一信', '222');
    lists[56] = new Option('223 澎湖二信', '223');
    lists[57] = new Option('224 金門信合社', '224');
    lists[58] = new Option('501 蘇澳漁會', '501');
    lists[59] = new Option('502 頭城漁會', '502');
    lists[60] = new Option('506 桃園漁會', '506');
    lists[61] = new Option('507 新竹漁會', '507');
    lists[62] = new Option('508 通苑漁會', '508');
    lists[63] = new Option('510 南龍漁會', '510');
    lists[64] = new Option('511 彰化區漁會', '511');
    lists[65] = new Option('512 雲林漁會', '512');
    lists[66] = new Option('513 瑞芳漁會', '513');
    lists[67] = new Option('514 萬里漁會', '514');
    lists[68] = new Option('516 基隆漁會', '516');
    lists[69] = new Option('517 南市漁會', '517');
    lists[70] = new Option('518 南縣漁會', '518');
    lists[71] = new Option('519 新化農會', '519');
    lists[72] = new Option('520 小港、高雄漁會等', '520');
    lists[73] = new Option('521 永安、林園、梓官漁會等', '521');
    lists[74] = new Option('523 東港、枋寮、林邊漁會等', '523');
    lists[75] = new Option('524 新港漁會', '524');
    lists[76] = new Option('525 澎湖漁會', '525');
    lists[77] = new Option('526 金門漁會', '526');
    lists[78] = new Option('538 宜蘭農會', '538');
    lists[79] = new Option('541 白河農會', '541');
    lists[80] = new Option('542 麻豆農會', '542');
    lists[81] = new Option('547 後壁農會', '547');
    lists[82] = new Option('549 下營農會', '549');
    lists[83] = new Option('551 官田農會', '551');
    lists[84] = new Option('552 大內農會', '552');
    lists[85] = new Option('556 學甲農會', '556');
    lists[86] = new Option('557 新市農會', '557');
    lists[87] = new Option('558 安定農會', '558');
    lists[88] = new Option('559 山上農會', '559');
    lists[89] = new Option('561 左鎮農會', '561');
    lists[90] = new Option('562 仁德農會', '562');
    lists[91] = new Option('564 關廟農會', '564');
    lists[92] = new Option('565 龍崎農會', '565');
    lists[93] = new Option('567 南化農會', '567');
    lists[94] = new Option('568 七股農會', '568');
    lists[95] = new Option('570 南投農會', '570');
    lists[96] = new Option('573 埔里農會', '573');
    lists[97] = new Option('574 竹山農會', '574');
    lists[98] = new Option('575 中寮農會', '575');
    lists[99] = new Option('577 漁池農會', '577');
    lists[100] = new Option('578 水里農會', '578');
    lists[101] = new Option('579 國姓農會', '579');
    lists[102] = new Option('580 鹿谷農會', '580');
    lists[103] = new Option('581 信義農會', '581');
    lists[104] = new Option('582 仁愛農會', '582');
    lists[105] = new Option('583 東山農會', '583');
    lists[106] = new Option('585 頭城農會', '585');
    lists[107] = new Option('586 羅東農會', '586');
    lists[108] = new Option('587 礁溪農會', '587');
    lists[109] = new Option('588 壯圍農會', '588');
    lists[110] = new Option('589 員山農會', '589');
    lists[111] = new Option('596 五結農會', '596');
    lists[112] = new Option('598 蘇澳農會', '598');
    lists[113] = new Option('599 三星農會', '599');
    lists[114] = new Option('600 財團法人全國農漁業及金融資訊中心', '600');
    lists[115] = new Option('602 中華民國農會', '602');
    lists[116] = new Option('605 高雄農會', '605');
    lists[117] = new Option('608 八德、大溪、大園農會等', '608');
    lists[118] = new Option('612 神岡、豐原農會等', '612');
    lists[119] = new Option('613 名間、集集農會等', '613');
    lists[120] = new Option('614 二林、永靖、竹塘農會等', '614');
    lists[121] = new Option('615 基隆農會', '615');
    lists[122] = new Option('616 二崙、斗南、斗六農會等', '616');
    lists[123] = new Option('617 水上、太保、六腳農會等', '617');
    lists[124] = new Option('618 六甲、北門、永康農會等', '618');
    lists[125] = new Option('619 大社、六龜、內門農會等', '619');
    lists[126] = new Option('620 九如、竹田、車城農會等', '620');
    lists[127] = new Option('621 吉安、富里、新秀農會等', '621');
    lists[128] = new Option('622 太麻里、台東、成功農會等', '622');
    lists[129] = new Option('624 澎湖農會', '624');
    lists[130] = new Option('625 臺中農會', '625');
    lists[131] = new Option('627 連江縣農會', '627');
    lists[132] = new Option('628 鹿港農會', '628');
    lists[133] = new Option('629 和美農會', '629');
    lists[134] = new Option('631 溪湖農會', '631');
    lists[135] = new Option('632 田中農會', '632');
    lists[136] = new Option('633 北斗農會', '633');
    lists[137] = new Option('635 線西農會', '635');
    lists[138] = new Option('636 伸港農會', '636');
    lists[139] = new Option('638 花壇農會', '638');
    lists[140] = new Option('639 大村農會', '639');
    lists[141] = new Option('642 社頭農會', '642');
    lists[142] = new Option('643 二水農會', '643');
    lists[143] = new Option('646 大城農會', '646');
    lists[144] = new Option('647 溪州農會', '647');
    lists[145] = new Option('649 埔鹽農會', '649');
    lists[146] = new Option('650 福興農會', '650');
    lists[147] = new Option('651 彰化農會', '651');
    lists[148] = new Option('683 北港農會', '683');
    lists[149] = new Option('685 土庫農會', '685');
    lists[150] = new Option('693 東勢鄉農會', '693');
    lists[151] = new Option('696 水林農會', '696');
    lists[152] = new Option('697 元長農會', '697');
    lists[153] = new Option('698 麥寮農會', '698');
    lists[154] = new Option('699 林內農會', '699');
    lists[155] = new Option('700 中華郵政', '700');
    lists[156] = new Option('749 內埔農會', '749');
    lists[157] = new Option('775 土城農會', '775');
    lists[158] = new Option('776 三重農會', '776');
    lists[159] = new Option('777 中和農會', '777');
    lists[160] = new Option('778 淡水農會', '778');
    lists[161] = new Option('779 樹林農會', '779');
    lists[162] = new Option('780 鶯歌農會', '780');
    lists[163] = new Option('781 三峽農會', '781');
    lists[164] = new Option('785 蘆洲農會', '785');
    lists[165] = new Option('786 五股農會', '786');
    lists[166] = new Option('787 林口農會', '787');
    lists[167] = new Option('788 泰山農會', '788');
    lists[168] = new Option('789 坪林農會', '789');
    lists[169] = new Option('790 八里農會', '790');
    lists[170] = new Option('791 金山農會', '791');
    lists[171] = new Option('792 瑞芳農會', '792');
    lists[172] = new Option('793 新店農會', '793');
    lists[173] = new Option('795 深坑農會', '795');
    lists[174] = new Option('796 石碇農會', '796');
    lists[175] = new Option('797 平溪農會', '797');
    lists[176] = new Option('798 石門農會', '798');
    lists[177] = new Option('799 三芝農會', '799');
    lists[178] = new Option('803 聯邦銀行', '803');
    lists[179] = new Option('805 遠東銀行', '805');
    lists[180] = new Option('806 元大銀行', '806');
    lists[181] = new Option('807 永豐銀行', '807');
    lists[182] = new Option('808 玉山銀行', '808');
    lists[183] = new Option('809 凱基銀行', '809');
    lists[184] = new Option('810 星展(台灣)銀行', '810');
    lists[185] = new Option('812 台新銀行', '812');
    lists[186] = new Option('815 日盛銀行', '815');
    lists[187] = new Option('816 安泰銀行', '816');
    lists[188] = new Option('822 中國信託', '822');
    lists[189] = new Option('860 中埔農會', '860');
    lists[190] = new Option('866 阿里山農會', '866');
    lists[191] = new Option('868 東勢農會', '868');
    lists[192] = new Option('869 清水農會', '869');
    lists[193] = new Option('870 梧棲農會', '870');
    lists[194] = new Option('871 大甲農會', '871');
    lists[195] = new Option('872 沙鹿農會', '872');
    lists[196] = new Option('874 霧峰農會', '874');
    lists[197] = new Option('875 太平農會', '875');
    lists[198] = new Option('876 烏日農會', '876');
    lists[199] = new Option('877 后里農會', '877');
    lists[200] = new Option('878 大雅農會', '878');
    lists[201] = new Option('879 潭子農會', '879');
    lists[202] = new Option('880 石岡農會', '880');
    lists[203] = new Option('881 新社農會', '881');
    lists[204] = new Option('882 大肚農會', '882');
    lists[205] = new Option('883 外埔農會', '883');
    lists[206] = new Option('884 大安農會', '884');
    lists[207] = new Option('885 龍井農會', '885');
    lists[208] = new Option('886 和平農會', '886');
    lists[209] = new Option('891 花蓮農會', '891');
    lists[210] = new Option('895 瑞穗農會', '895');
    lists[211] = new Option('896 玉溪農會', '896');
    lists[212] = new Option('897 鳳榮農會', '897');
    lists[213] = new Option('898 光豐農會', '898');
    lists[214] = new Option('901 大里農會', '901');
    lists[215] = new Option('902 苗栗農會', '902');
    lists[216] = new Option('903 汐止農會', '903');
    lists[217] = new Option('904 新莊農會', '904');
    lists[218] = new Option('906 頭份農會', '906');
    lists[219] = new Option('907 竹南農會', '907');
    lists[220] = new Option('908 通霄農會', '908');
    lists[221] = new Option('909 苑裡農會', '909');
    lists[222] = new Option('910 平鎮、復興、新屋農會等', '910');
    lists[223] = new Option('912 冬山農會', '912');
    lists[224] = new Option('913 後龍農會', '913');
    lists[225] = new Option('914 卓蘭農會', '914');
    lists[226] = new Option('915 西湖農會', '915');
    lists[227] = new Option('916 草屯農會', '916');
    lists[228] = new Option('917 公館農會', '917');
    lists[229] = new Option('918 銅鑼農會', '918');
    lists[230] = new Option('919 三義農會', '919');
    lists[231] = new Option('920 造橋農會', '920');
    lists[232] = new Option('921 南庄農會', '921');
    lists[233] = new Option('922 臺南農會', '922');
    lists[234] = new Option('923 獅潭農會', '923');
    lists[235] = new Option('924 頭屋農會', '924');
    lists[236] = new Option('925 三灣農會', '925');
    lists[237] = new Option('926 大湖農會', '926');
    lists[238] = new Option('928 大里、冬山、板橋農會等', '928');
    lists[239] = new Option('929 關西農會', '929');
    lists[240] = new Option('930 新埔農會', '930');
    lists[241] = new Option('931 竹北農會', '931');
    lists[242] = new Option('932 湖口農會', '932');
    lists[243] = new Option('933 芎林農會', '933');
    lists[244] = new Option('934 寶山農會', '934');
    lists[245] = new Option('935 峨眉農會', '935');
    lists[246] = new Option('936 北埔農會', '936');
    lists[247] = new Option('937 竹東農會', '937');
    lists[248] = new Option('938 橫山農會', '938');
    lists[249] = new Option('939 新豐農會', '939');
    lists[250] = new Option('940 新竹農會', '940');
    lists[251] = new Option('951 北區農漁會', '951');
    lists[252] = new Option('953 田尾農會', '953');
    lists[253] = new Option('961 同袍儲蓄會', '961');
    lists[254] = new Option('984 北投農會', '984');
    lists[255] = new Option('985 士林農會', '985');
    lists[256] = new Option('986 內湖農會', '986');
    lists[257] = new Option('987 南港農會', '987');
    lists[258] = new Option('988 木柵農會', '988');
    lists[259] = new Option('989 景美農會', '989');
    lists[260] = new Option('995 關貿網路', '995');
    lists[261] = new Option('996 財政部', '996');
    lists[262] = new Option('998 聯合徵信中心', '998');
    lists[263] = new Option('999 票據交換所', '999');

    return lists;
  }

}
