/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {    
    // 新闻列表    
    articleList () {        
        return axios.get(`${base.sq}/index.json`);    
    },    
    // // 新闻详情,演示    
    // articleDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },
    // // post提交    ,,
    // login (params) {        
    //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));  
    
    //  qs.stringify({ 'params': 7758521 }, { indices: false })
    // }
    // 其他接口…………

    // goodslist (params){
    //     return axios.post(`${base.bd}`,qs.stringify(params))
    // },
    // goodsdetials (params){
    //     return axios.post(`${base.aaa}`,qs.stringify(params))
    // }
}

export default article;