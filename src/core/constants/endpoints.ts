export const Endpoints = {
    Global: 'responsible',
    Runtime: {
        Ping: 'ping',
    },
    Account: {
        Base: 'account',
        Install: 'login',
        UnInstall: 'delete',
        PaidStatus: 'status',
    },
    Users: {
        Base: 'users',
        Exact: 'exact'
    },
    WidgetController: 'example.com',
} as const;
