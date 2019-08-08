const cn = {
    language:'繁體中文',
    menu:{
        title: '六域息影',
        home:'首頁',
        block:'區塊',
        assets:'二級通證',
        history:'交易記錄',
    },
    home:{
        amount:'交易總量',
        assetsTotal:'通證總數',
        height:'最新區塊高度',
        newtrading:'最新區塊交易量',

        trading_amount:'交易量',
        trading:'近30天交易量',
        charts:['',''],

        blocklist:'最近區塊',
        head1:['區塊高度','區塊哈希','交易量','關閉時間'],

        tradinglist:'最近交易',
        head2:['交易哈希','交易類型','數量','時間'],

        web:['六域官網','六域量註','六域超導','六域錢包'],
        email:'客服郵箱',
    },

    assets:{
        tit:'通證概覽',
        tit2:'通證',
        tit3:'發行地址',
        tit4:'發行總量',
        number:'#',
        more: '加載更多',
        nomore: '暫無更多數據'
    },

    assets_detail: {
        from: '發行地址',
        amount: '發行總量',
        total: '流通總量',
        desc: '項目信息',
        trading: '近7天交易量',
        transactions: '交易記錄',
        addrratio: '地址比例',
        hash: '交易哈希',
        type: '交易類型',
        time: '時間',
        loadmore: '加載更多',
        address: '地址',
        number: '數量',
        ratio:	'比例',
        payment: '轉賬',
        trustset: '通證授信',
        accountset:	'賬戶設置',
        offercreate: '創建掛單',
        offercancel: '取消掛單',
        multipayment: '批量轉賬',
        other: '其他',
        tradingvolume: '交易量'
    },

    wallet: {
        home: '首頁',
        wallet_address: '錢包地址',
        tipqr:	'查看錢包地址二維碼',
        tipcopy: '復制錢包地址',
        balance: '余額',
        passport: '二級通證',
        more: '更多',
        record: '交易記錄',
        hash: '交易哈希',
        type: '交易類型',
        num: '交易量',
        time: '時間',
        payment: '轉賬',
        trustset: '通證授信',
        accountset:	'賬戶設置',
        offercreate: '創建掛單',
        offercancel: '取消掛單',
        multipayment: '批量轉賬',
        incoming: '轉入',
        outgoing: '轉出',
        other: '其他',
        loadmore: '加載更多',
        token: '通證',
        quantity: '擁有數量',
        from: '發行地址'
    },

    block:{
        tit:'區塊',
        head:['區塊高度','區塊哈希','交易量','關閉時間'],

        tit2:'區塊詳情',

        tit3:'交易記錄',
        head2:['交易哈希','發起方','交易類型','手續費','時間'],

        info:['交易數量','區塊高度','關閉時間','當前區塊哈希','交易哈希樹根','上壹區塊哈希']
    },
    hash:{
        tit:'交易哈希',
        tit2:'交易結果',
        list:['交易類型','發起地址','接收地址','區塊高度','交易狀態','交易數量','手續費','時間','備註','發行地址'],
        text:['設置說明','授權數量']
    },
    account:{
        tit:'錢包地址',
        account:'賬戶',
        balance:'余額',
    },
    history:{
        tit:'交易記錄',
        head:['交易哈希','交易類型','交易量','時間'],
    },
    nodata:'暫無數據',
    nothing:'無',
    more:'加載更多',
    nomore:'已加載完',
    erraccount:'未搜索到結果',
    errblock:'未搜索到結果',
    errhash:'未搜索到結果',
    searcherr:'請輸入搜索內容',
    search:'地址 / 區塊 / 哈希 / 通證',
    e404:'404',
    backhome:'返回至首頁',
    copy:'復制錢包地址',
    qr:'查看錢包地址二維碼',
    copysuc:'已復制到剪貼板！',
    copyerr:'復制失敗,請重試！',
    enter:'請輸入...',
    fee:'費率',

    Payment:'轉賬',
    OfferCreate:'創建掛單',
    OfferCancel:'取消掛單',
    AccountSet:'賬戶設置',
    TrustSet:'通證授信',
    other:'其它',

    success:'成功',
    error:'失敗',
    note:'提示',
    copyright:'Copyright © 2018~2019 六域鏈聯盟(加拿大)版權所有'
}

export default cn
