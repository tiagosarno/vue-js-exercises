import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio'

import Menu from './components/template/Menu.vue'
import MenuAlt from './components/template/MenuAlt.vue'

import Usuario from './components/usuario/Usuario'
import UsuarioLista from './components/usuario/UsuarioLista'
import UsuarioEditar from './components/usuario/UsuarioEditar'
import UsuarioDetalhe from './components/usuario/UsuarioDetalhe'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition
        }
        else if(to.hash) {
            return { selector: to.hash }
        }
        else {
            return { x: 0, y: 0 }
        }
    },
    routes: [{
        name: 'inicio',
        path: '/',
        // component: Inicio
        components: {
            default: Inicio,
            menu: Menu
        }
    },{
        path: '/usuario',
        // component: Usuario,
        components: {
            default: Usuario,
            menu: MenuAlt,
            menuInferior: MenuAlt
        },
        props: true,
        children: [
            { path: '', component: UsuarioLista },
            { path: ':id', component: UsuarioDetalhe, props: true },
            { 
                path: ':id/editar', 
                component: UsuarioEditar, 
                props: true, 
                name: 'editarUsuario' 
            },
        ]
    },{
        path: '/redirecionar',
        redirect: '/usuario'
    },{
        // Todas as rotas n configuradas serão redirecionadas para "/"
        // pode ser criada uma página 404 para melhorar a UX
        path: '*',
        redirect: '/'
    }]
})