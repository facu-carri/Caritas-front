export const serverAddress = 'http://localhost:8080/api'
export const endPoints = {
    login: 'v1/auth/authenticate',
    registerHelper: ''
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
    admin: adminRoutes,
    exchanger: exchangerRoutes
}
export const roles = {
    'ADMIN': 'ADMIN',
    'HELPER': 'AYUDANTE',
    'NORMAL': 'INTERCAMBIADOR'
}
export const colors = {
    'white': '#FFFFFF'
}