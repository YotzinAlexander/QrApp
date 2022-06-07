import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ConnectionService } from 'src/app/services/connection.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginUsr = {
    user: '',
    password: ''
  }

  constructor(private alertController: AlertController,
              private navController: NavController,
              private screenOrientation: ScreenOrientation,
              private connectionService: ConnectionService
              ){

  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }


  async login(){
    //const valido = await this.connectionService.login(this.loginUsr.user, this.loginUsr.password);
    //console.log(valido);
    this.connectionService.login(this.loginUsr.user, this.loginUsr.password).subscribe( resp =>{
      if(resp['ok']){
        const data = resp['data'];
        const uType = data['type'];
        console.log(uType);
        if(uType == 0 ){
          console.log('admin');
          this.navController.navigateRoot('/menu-admin',{animated:true});
          localStorage.setItem('uType', uType)
        }
        if(uType == 1 ){
          console.log('caseta');
          this.navController.navigateRoot('/lista-asistencia',{animated:true});
          localStorage.setItem('uType', uType)
        } if (uType == 2){
          console.log('lector');
          this.navController.navigateRoot('/lector',{animated:true});
          localStorage.setItem('uType', uType)
        }
        if (uType == 3){
          console.log('lector');
          this.navController.navigateRoot('/visualizador',{animated:true});
          localStorage.setItem('uType', uType)
        }
      }else{
        this.alert();
      }
    });


 /*   if( valido ){
      // NAV...

    } else {
      this.alert();
    }
*/

/*
    if(this.loginUsr.user  == 'user' && this.loginUsr.password == '1234'){
      this.navController.navigateRoot('/lista-asistencia',{animated:true});
      console.log('usuario normal');
    } else if ( this.loginUsr.user == 'admin' && this.loginUsr.password =='1234'){
      this.navController.navigateRoot('/menu',{animated:true});
      console.log('usuarios admin');
    } else  {
      this.alert();
    }
    */
  }

  async alert(){
    const alert = await this.alertController.create({
      header:'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  

}
