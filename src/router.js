import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index'
import NotFound from './pages/NotFound.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegisteration from './pages/coaches/CoachRegisteration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsList from './pages/requests/RequestsList.vue'
import UserAuth from './pages/auth/UserAuth.vue'

const router = createRouter({
    routes: [
        {
            path: '/', redirect: '/coaches'
        },
        {
            path: '/coaches', component: CoachesList
        },
        {
            path: '/coach/:id', component: CoachDetails,
            props: true,
            children: [
                {
                    path: 'contact', component: ContactCoach
                }
            ]
        },
        {
            path: '/register', component: CoachRegisteration,
            meta: {
                auth: true
            }
        },
        {
            path: '/requests', component: RequestsList,
            meta: {
                auth: true
            }
        },
        {
            path: '/login', component: UserAuth,
            meta: {
                noAuth: true
            }
        },
        {
            path: '/:notFound(.*)', component: NotFound
        },
    ],
    history: createWebHistory()
})

router.beforeEach((to, _, next) => {
    const isAuth = store.getters.isAuthenticated
    if (to.meta.auth && !isAuth) {
        next('/login')
    } else if (to.meta.noAuth && isAuth) {
        next('/')
    } else {
        next()
    }
})

export default router