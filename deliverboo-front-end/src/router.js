import { createRouter, createWebHistory } from 'vue-router';
import AppRestaurants from './components/AppRestaurants.vue';
import AppDishes from './components/AppDishes.vue';
import AppPagamento from './components/AppPagamento.vue';
import AppOrder from './components/AppOrder.vue';
import ChiSiamo from './components/ChiSiamo.vue';
import AppJumbo from './components/AppJumbo.vue';
import ThankYou from './components/ThankYou.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
            {
                path: '/',
                name: 'homepage',
                component: AppJumbo
            },
            {
                path: '/restaurants',
                name: 'restaurants',
                component: AppRestaurants
            },
            {
                path: '/restaurant/dishes',
                name: 'dishes',
                component: AppDishes
            },
            {
                path: '/ordine',
                name: 'ordine',
                component: AppOrder
            },
            {
                path: '/pagamento',
                name: 'pagamento',
                component: AppPagamento
            },
            {
                path: '/chisiamo',
                name: 'chisiamo',
                component: ChiSiamo
            },
            {
                path: '/grazie',
                name: 'thankyou',
                component: ThankYou
            },
            // {
            //     path: '/chisiamo',
            //     name: 'chisiamo',
            //     component: ChiSiamo
            // },

        ]
    });
export { router };