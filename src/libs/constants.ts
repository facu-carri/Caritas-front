export const serverAddress = 'http://localhost:8080/api'
export const endPoints = {
    login: 'v1/auth/authenticate',
    verificationCode: 'v1/auth/verificationCode',
    registerHelper: 'employee', 
    registerExchanger: 'v1/auth/register', 
    profile:'exchanger/myProfile',
    inventory:'exchanger/myInventory',
}
const adminRoutes = {
    'estadisticas': '/estadisticas',
    'gestionarUsuarios': '/gestionar-usuarios',
    'gestionarAyudantes': '/gestionar-ayudantes',
    'listarDonaciones': '/donaciones',
    'gestionarFiliales': '/gestionar-filiales',
}
const exchangerRoutes = {
    'inventory': 'inventario',
    'profile': 'perfil'
}
export const routes = {
    main: '/',
    login: '/login',
    auth: '/auth',
    register: '/register',
    admin: adminRoutes,
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