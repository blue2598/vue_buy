import axios from './index'

// 1. 定义基础路径
const BASE_URL = 'https://www.fastmock.site/mock/5be73acffa04964e175aa5d4ad4354f1/easybuy/'

/*****Home 模块*******/
//轮播图
export const getBanner = () => axios(BASE_URL + 'banner');
//广告
export const getAdvertise = () => axios(BASE_URL + 'advertisement');
// 首页分类按钮块
export const getItemList = () => axios(BASE_URL + 'tabitem');
// 限时抢购
export const getFlashsale = () => axios(BASE_URL + 'falshsale');
// 特色专区
export const getSpecial = () => axios(BASE_URL + 'special');
// 产品列表
export const getAll_lists = () => axios(BASE_URL + 'productlist');// 全部
export const getDinner_lists = () => axios(BASE_URL + 'productlist?type=1');//晚餐
export const getHot_lists = () => axios(BASE_URL + 'productlist?type=2');//人气
export const getSelect_lists = () => axios(BASE_URL + 'productlist?type=3');//心选
//分类
export const getCatelists = () => axios(BASE_URL + 'category');

// 登录
export const getVerifyCode = () => axios(BASE_URL + 'verifycode');
//获取用户名
export const getUserinfo = (phone) => axios(BASE_URL + 'userinfo',{
    phone
},'POST');

//推荐菜
//推荐菜类别
export const getRconmmendType = () => axios(BASE_URL + 'recommendtype');
export const getRconmmendDefault = (id) => axios(BASE_URL + 'recommend?id='+id);