export const serverAddress = 'http://localhost:8080/api'
export const endPoints = {
    login: 'v1/auth/authenticate',
    verificationCode: 'v1/auth/verificationCode',
    registerHelper: 'employee', 
    registerExchanger: 'v1/auth/register',

    profile: 'exchanger/myProfile',
    otherProfile: 'exchanger/',
    profileHelper: 'employee/myProfile',
    otherProfileHelper: 'employee/',
    inventory: 'item/myInventory',
    reviews: 'reviewsOf/',

    location: 'location',
    freeLocations: 'freeLocations',

    categories: 'itemCategory',
    exchangeablesItems: 'item',
    addItem: 'item',
    exchanger: 'exchanger',
    getAllDonations: 'allDonations',
    employees: 'employee',
    exchange: 'exchange',
    addReview: 'exchange/review',
    
    requestsSent: 'exchange/requestsSent',
    requestsReceived: 'exchange/requestsReceived',
    exchangesHistory: 'exchange/exchangesHistory',

    notification: 'exchange/myNotifications',
    acceptNotification: 'exchange/accept',
    rejectNotification: 'exchange/reject',

    cancelExchange: 'exchange/cancel',
    nextFreeDay: 'exchange/nextFreeDay',
    endDay: 'exchange/endDay',
    todayIsFinished: 'exchange/todayIsFinished',

    donation: 'donation',
    trackDonation: 'saveDonation',
}
const adminRoutes = {
    'estadisticas': '/estadisticas',
    'gestionarIntercambiadores': '/gestionar-intercambiadores',
    'gestionarAyudantes': '/gestionar-ayudantes',
    'listarDonaciones': '/donaciones',
    'gestionarFiliales': '/gestionar-filiales',
}
const helperRoutes = {
    profile: '/perfilAyudante',
    exchange: '/exchange'
}
const exchangerRoutes = {
    'requestsSent': '/requestsSent',
    'requestsReceived': '/requestsReceived',
    'exchangesHistory': '/exchangesHistory',
    'exchange':'/exchange',
    'history': '/historial',
    'inventory': '/inventario',
    'donations': '/donaciones',
    'donationsSucess': '/donaciones/sucess',
    'donationsFailure': '/donaciones/failure',
    'profile': '/perfil',
    'information':'/informacion'
}
export const routes = {
    main: '/',
    login: '/login',
    auth: '/auth',
    register: '/register',
    admin: adminRoutes,
    helper: helperRoutes,
    exchanger: exchangerRoutes,
    item: 'item'
}
export const roles = {
    'ADMIN': 'ADMIN',
    'HELPER': 'AYUDANTE',
    'EXCHANGER': 'INTERCAMBIADOR'
}
export const MaxStars = 10
export const colors = {
    'white': '#FFFFFF'
}