import SampleView from '../views/SampleView.vue'


export const DATA_SOURCE_ROUTE = {
  path: '/',
  component: SampleView,
  meta: {
    titleKey: 'title.main'
  }
}

export const DASHBOARD_ROUTE = {
  path: '/dashboard',
  component: SampleView,
  meta: {
    titleKey: 'title.dashboard'
  }
}

export const ERROR_ROUTE = {
  path: '/error',
  component: SampleView,
  meta: {
    titleKey: 'title.error'
  }
}

const GENERIC_ROUTE = {
  path: '/:pathMatch(.*)*',
  redirect: '/'
}


export const routes = [
  DATA_SOURCE_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_ROUTE,
  GENERIC_ROUTE
]
