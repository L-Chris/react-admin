import { lazy } from 'react';
// import Loadable from 'react-loadable'
// import Loading from '@/layouts/loading'

export const AsyncUserView = lazy(() => import('./user'))

export const AsyncShopView = lazy(() => import('./shop'))

export const AsyncMenuView = lazy(() => import('./menu'))

export const AsyncDishView = lazy(() => import('./dish'))

export const AsyncOrderView = lazy(() => import('./order'))

export const AsyncLoginView = lazy(() => import('./login'))