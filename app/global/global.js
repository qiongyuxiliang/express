var Global = {
    // 数据库地址
    ip: '47.100.102.37',
    database: 'micro_business',
    pass: 'root123456',
    admin: 'root',
    /*美享99数据库地址*/
    mx99Ip: '172.19.41.66',
    mx99Database: 'mx-business-1',
    mx99Pass: 'uAiqwVwjJ8-i',
    mxAdmin: 'root',

    SUCCESS: '0x00001',
    FAILURE: '0x00002',
    ONLINE: '0x00003',
    OFFLINE: '0x00004',
    LOGIN_OUT: '0x00005',
    TOKEN_ERROR: '0x00006',
    PARAM_ERROR: '0x00007',
    LOGIN_SUCCESS_SECOND: '0x00008',
    NO_USER_ADDRESS: '0x00011',
    userType: {
        BEAUTY_USER: "beautyUser",
        BEAUTY_BOSS: "beautyBoss",
        BEAUTY_CLERK: "beautyClerk"
    },
    redis:{
        redis: {
            host: '127.0.0.1',
            port: "6379",
            ttl:1000*60*2,

        },
        redisPass:'123456',
    }
}
module.exports = Global;