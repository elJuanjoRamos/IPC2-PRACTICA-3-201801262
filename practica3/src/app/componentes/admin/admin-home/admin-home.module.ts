import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminHomePage } from './admin-home.page';
//Services

import { UsuarioService } from '../../../services/usuario.service';
import { AdminRoutingModule } from './admin-routing.module';


/*const routes: Routes = [
  {
    path: '',
    component: AdminHomePage,
    children: [
      {
        path: 'usuario', loadChildren: '../usuario/usuario.module#UsuarioPageModule'
      }
    ]
  }
];*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRoutingModule
    //RouterModule.forChild(routes)
  ],
  providers: [UsuarioService],
  declarations: [AdminHomePage]
})
export class AdminHomePageModule {}
