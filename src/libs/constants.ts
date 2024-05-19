export const serverAddress = 'http://localhost:8080/api'
export const endPoints = {
    login: 'v1/auth/authenticate'
}
const adminRoutes = {
    'estadisticas': '/estadisticas',
    'gestionarUsuarios': '/gestionar-usuarios',
    'gestionarAyudantes': '/gestionar-ayudantes',
    'listarDonaciones': '/donaciones',
    'gestionarFiliales': '/gestionar-filiales',
     
}
export const routes = {
    main: '/',
    login: '/login',
    admin: adminRoutes
}
export const roles = {
    'ADMIN': 'administrador',
    'HELPER': 'ayudante',
    'NORMAL': 'intercambiador'
}
export const colors = {
    'white': '#FFFFFF'
}