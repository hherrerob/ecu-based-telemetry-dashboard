import SampleView from '../views/SampleView.vue'
import DatabaseSelectionView from '../views/DatabaseSelectionView.vue'
import DashboardView from '../views/DashboardView.vue'


export const DATABASE_SELECTION_ROUTE = {
  path: '/',
  component: DatabaseSelectionView,
  meta: {
    titleKey: 'title.main'
  }
}

export const DASHBOARD_ROUTE = {
  path: '/dashboard',
  component: DashboardView,
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
  DATABASE_SELECTION_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_ROUTE,
  GENERIC_ROUTE
]
