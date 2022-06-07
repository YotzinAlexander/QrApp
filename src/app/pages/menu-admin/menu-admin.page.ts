import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage implements OnInit {

  constructor(
    private navController: NavController,
    private screenOrientation: ScreenOrientation
  ) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }

  navigateBack(){
    this.navController.navigateRoot('/login',{animated: true});

  }

  navigateLector(){
    this.navController.navigateRoot('/lector',{animated: true});
  }

  navigateLista(){
    this.navController.navigateRoot('/lista-asistencia',{animated:true});
  }

  navigateVisualizador(){
    this.navController.navigateRoot('/visualizador',{animated: true});
  }

  salir(){
    this.navController.navigateRoot('/login',{animated: true});

  }


}

