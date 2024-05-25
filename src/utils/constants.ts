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
    location: 'location',
    myReviews: 'reviews/myReviews',
    categories: 'itemCategory',
    exchangeablesProducts: 'item',
    addItem: 'item',
    exchanger: 'exchanger',
    employees: 'employee',
}
const adminRoutes = {
    'estadisticas': '/estadisticas',
    'gestionarUsuarios': '/gestionar-usuarios',
    'gestionarAyudantes': '/gestionar-ayudantes',
    'listarDonaciones': '/donaciones',
    'gestionarFiliales': '/gestionar-filiales',
}
const helperRoutes = {
    profile: '/perfilAyudante'
}
const exchangerRoutes = {
    'inventory': '/inventario',
    'profile': '/perfil',
    'caritasInformation':'/informacionCaritas'
}
export const routes = {
    main: '/',
    login: '/login',
    auth: '/auth',
    register: '/register',
    admin: adminRoutes,
    helper: helperRoutes,
    exchanger: exchangerRoutes
}
export const roles = {
    'ADMIN': 'ADMIN',
    'HELPER': 'AYUDANTE',
    'EXCHANGER': 'INTERCAMBIADOR'
}
export const colors = {
    'white': '#FFFFFF'
}