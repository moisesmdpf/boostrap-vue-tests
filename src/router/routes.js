import Index from './../components/Index.vue';
import FetchAndOrder from './../components/test1/fetchAndOrder.vue';
import FetchAndFind from './../components/test2/fetchAndfind.vue';
import FetchAndCount from './../components/test3/fetchAndCount.vue';
import FastesShip from './../components/test4/fastestShip.vue';

export default [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/test1',
        component: FetchAndOrder,
    },
    {
        path: '/test2',
        component: FetchAndFind,
    },
    {
        path: '/test3',
        component: FetchAndCount,
    },
    {
        path: '/test4',
        component: FastesShip,
    },
];
