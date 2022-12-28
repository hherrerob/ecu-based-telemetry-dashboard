import SampleView from '../views/SampleView.vue'
import DatabaseSelectionView from '../views/DatabaseSelectionView.vue'
import DashboardView from '../views/DashboardView.vue'
import { DASHBOARD_ROUTE, DATABASE_SELECTION_ROUTE, ERROR_ROUTE } from './constants'


export const DATABASE_SELECTION_ROUTE_VIEW = {
  path: DATABASE_SELECTION_ROUTE.path,
  component: DatabaseSelectionView,
}

export const DASHBOARD_ROUTE_VIEW = {
  path: DASHBOARD_ROUTE.path,
  component: DashboardView,
}

export const ERROR_ROUTE_VIEW = {
  path: ERROR_ROUTE.path,
  component: SampleView,
}

const GENERIC_ROUTE_VIEW = {
  path: '/:pathMatch(.*)*',
  redirect: '/'
}


export const routes = [
  DATABASE_SELECTION_ROUTE_VIEW,
  DASHBOARD_ROUTE_VIEW,
  ERROR_ROUTE_VIEW,
  GENERIC_ROUTE_VIEW
]
