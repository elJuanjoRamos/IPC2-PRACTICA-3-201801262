import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
    usuario: any;
    info: any;
  constructor(private service: UsuarioService) { 
    this.service.getUsuario(localStorage.getItem('id')).subscribe(data => {
        this.usuario = data;
        this.info = JSON.parse(JSON.stringify(this.usuario));
    });
  }

  ngOnInit() {
  }

}
