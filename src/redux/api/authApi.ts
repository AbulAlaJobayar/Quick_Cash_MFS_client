import { baseApi } from './baseApi';
const authApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
me:build.query({
    url:,
    method: 'get',
})
    })
})