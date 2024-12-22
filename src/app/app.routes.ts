import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ViewCategoryComponent } from './pages/view-category/view-category.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
    path: 'tvshow/:series_id',
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
    component: LoginPageComponent,
  },
];
