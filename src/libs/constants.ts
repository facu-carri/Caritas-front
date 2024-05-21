export const serverAddress = 'http://localhost:8080/api'
export const endPoints = {
    login: 'v1/auth/authenticate',
    verificationCode: 'v1/auth/verificationCode',
    registerHelper: '/api/employee', //made by ale, por si despues hay que corregir
    registerExchanger: 'v1/auth/register'
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