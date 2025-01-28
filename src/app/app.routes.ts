import { Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { ViewCategoryComponent } from './pages/view-category/view-category.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PredictComponent } from './components/predict/predict.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'tvshows/:series_id',
    component: DetailComponent,
  },
  {
    path: 'movie/:movie_id',
    component: DetailComponent,
  },
  {
    path: 'movies',
    component: ViewCategoryComponent,
  },
  {
    path: 'tvshows',
    component: ViewCategoryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'predict',
    component: PredictComponent,
  },
];
