import Http from './http'

// 封装各种接口请求
// export const 接口名 = () => Http.get('/路由',参数对象);

//获取人员信息
export const getUseinfo = () => Http.post('/wx/wxuser/listByCompany');