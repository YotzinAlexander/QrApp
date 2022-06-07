import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
  navigateVisualizador(){
    this.navController.navigateRoot('/visualizador',{animated: true});
  }

  salir(){
    this.navController.navigateRoot('/login',{animated: true});

  }


}

