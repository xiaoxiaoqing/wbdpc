import {
    SET_IDENTITY,
    // SET_AUTHENTICATED
    SET_COUNT
} from '../mutation-types'
const state = {
    // token: getToken(),
    account: null, // 当前用户信息
    authenticated: false, // 是否已经登录
    userIdentity: undefined, // 用户认证的信息
    count: 0//未读消息
}
const getters = {
    account: state => state.account,
}
const mutations = {
    [SET_IDENTITY](state, identity) {
        state.userIdentity = identity
        state.account = identity
    },
    [SET_COUNT](state, count) {
        state.count = count
    }

}

