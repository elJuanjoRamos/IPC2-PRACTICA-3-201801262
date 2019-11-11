import { Component, OnInit } from '@angular/core';
import { NavController, ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router, public navCtrl: NavController,
              public toastController: ToastController, private service: AuthenticationService) { }

  ngOnInit() {
  }
  async InicioSesion(ursn: string, pass: string) {
    if (ursn === undefined || pass === undefined) {
      const toast = await this.toastController.create({
        message: 'Uno o más campos estan vacíos. Verificar datos.',
        duration: 2000
      });
      toast.present();

    } else {
      let usuario = {
        username: ursn,
        password: pass
      }

      this.service.login(usuario);/*.catch(err =>alert('los datos son incorrectos o no existe el usuario'))*/;
      //this.service.login(usuario);

        //this.navCtrl.navigateForward("/home-page/edituser");
      //this.navCtrl.navigateForward("/home-tabs/inbox/" + username);
    }

}
}
