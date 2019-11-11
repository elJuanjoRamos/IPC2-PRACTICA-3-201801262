import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  //{ path: 'home', loadChildren: () => import('./componentes/home/home.module').then(m => m.HomePageModule) },
  { path: 'admin-home', loadChildren: () => import('./componentes/admin/admin-home/admin-home.module').then(m => m.AdminHomePageModule) },
  //{ path: 'admin-home', loadChildren: './componentes/admin/admin-home/admin-home.module#AdminHomePageModule' },
  { path: 'usuario', loadChildren: './componentes/admin/usuario/usuario.module#UsuarioPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
