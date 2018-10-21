import Loadable from 'react-loadable'
import Loading from '@/layouts/loading'

export const AsyncUserView = Loadable({
  loader: () => import('./user'),
  loading: Loading
})

export const AsyncMenuView = Loadable({
  loader: () => import('./menu'),
  loading: Loading
})

export const AsyncDishView = Loadable({
  loader: () => import('./dish'),
  loading: Loading
})

export const AsyncOrderView = Loadable({
  loader: () => import('./order'),
  loading: Loading
})

export const AsyncLoginView = Loadable({
  loader: () => import('./login'),
  loading: Loading
})