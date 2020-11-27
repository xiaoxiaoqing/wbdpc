import Http from './http'

// 封装各种接口请求
// export const 接口名 = () => Http.get('/路由',参数对象);

export const getUseinfo = () => Http.get('/wx/user/findWxUserinfo');//获取人员信息