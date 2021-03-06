/**
 * home模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {
    // 获取礼包绑定的祝福信息 
    getBless (params){
        return axios.post(`${base.home}/exchange/bless`,qs.stringify(params))
    },
    // 礼包商品列表
    getGoodsList(params){
        return axios.post(`${base.home}/exchange/goodsList`,qs.stringify(params))
    },
    // 商品详情
    getGoodsDetail(params){
        return axios.post(`${base.home}/exchange/goodsDetail`,qs.stringify(params))
    },
    // 验证配送区域
    getRegion(params){
        return axios.post(`${base.home}/exchange/checkGoodsRegion`,qs.stringify(params))
    },
    // 检测卡号密码的正确性
    accountPwd(params){
        return axios.post(`${base.home}/exchange/checkAccountPwd`,qs.stringify(params))
    },
    //生成订单
    order(params){
        return axios.post(`${base.home}/exchange/generateOrder`,qs.stringify(params))
    },
    weipay(params){
        return axios.post(`${base.home}/weipay/weipay`,qs.stringify(params))
    },
    generateOrder(params){
        return axios.post(`${base.home}/exchange/generateOrder`,qs.stringify(params))
    },
    //记录转赠信息
    DonateLog(params){
        return axios.post(`${base.home}/donate/addDonateLog`,qs.stringify(params))
    },
    //上传转赠图片
    UploadImg(params){
        return axios.post(`${base.home}/index.php?g=Wechat&m=Around&a=saveImgBase64&interface=1`,qs.stringify(params))
    },
    //确认转赠
    donateUser(params){
        return axios.post(`${base.home}/donate/donateUser`,qs.stringify(params))
    },
    //获取验证码
    getCode(params){
        return axios.post(`${base.home}/exchange/getCode`,qs.stringify(params))
    },
//获取验证码
    getParamsCode(params){
        return axios.post(`${base.home}/exchange/getParamCode`,qs.stringify(params))
    },

//商品的替补信息
    getNoSkuInfo(params){
        return axios.post(`${base.home}/exchange/getNoSkuInfo`,qs.stringify(params))
    },
//商品公告相关
    getGoodsNotice(params){
        return axios.post(`${base.home}/exchange/getGoodsNotice`,qs.stringify(params))
    },
//加价购列表
    getAddGoods(params){
        return axios.post(`${base.home}/exchange/getAddBuyGoodsList`,qs.stringify(params))
    },
// 生成空订单
    getEmptyOrder(params){
        return axios.post(`${base.home}/exchange/generateEmptyOrder`,qs.stringify(params))    
    },
// 提交订单
    getSubmitOrder(params){
        return axios.post(`${base.home}/exchange/submitOrder`,qs.stringify(params))    
    },
// 获取微信支付参数
    getWeiPay(params){
        return axios.post(`${base.home}/exchange/weipay`,qs.stringify(params))    
    },
// 商品公告

    getGoodsNoticeNew(params){
        return axios.post(`${base.home}/exchange/getGoodsNoticeNew`,qs.stringify(params))
    },
    // 通用公告
    getCurrencyNotice(params){
        return axios.post(`${base.home}/index.php?g=Wechat&m=User&a=getAdver&interface=1`,qs.stringify(params))
    }


}

export default home;  