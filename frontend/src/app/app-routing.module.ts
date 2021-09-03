import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
// home components
import { LoginComponent }    from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
// guards
import { AuthGuard } from './guards/auth.guard';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'listPost',
    component: ListPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: 'savePost',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
