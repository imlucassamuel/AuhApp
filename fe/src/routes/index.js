import { createRouter, createWebHashHistory } from 'vue-router'
import Card from '../components/Card.vue';
import Main from '../pages/Main.vue';
import getTokenFromCookies from '../utils/getTokenFromCookies';
import setCookie from '../utils/saveTokenIntoCookies.js';
import instance from '../http/axios.js';
import { Notification } from '../toast/handleToast.js';

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: Card
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: Card
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = getTokenFromCookies('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await validateToken(isAuthenticated)) {
      next({ path: '/sign-in' });
    } else {
      next();
    }
  } else {
    next();
  }
});

async function validateToken(isAuthenticated) {
  if (!isAuthenticated)
    return true;

  try {
    const { data } = await instance.get('/main');
    setCookie('email', data.data.email);
    return false;

  } catch (error) {
    Notification(error);
    return true;
  }
}

export default router;
