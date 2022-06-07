import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.page.html',
  styleUrls: ['./visualizador.page.scss'],
})
export class VisualizadorPage implements OnInit {

  users = [];

  uType: string;


  constructor(
    private navController:NavController,
    private connectionService: ConnectionService,
    private screenOrientation: ScreenOrientation

  ) { }

  ngOnInit() {
    const search =  this.connectionService.getUsersAccess().subscribe( resp =>{
      //console.log(resp);
      const userss = resp['data'];
      this.users = userss;
      console.log("[ THIS ]",this.users);

    });


    this.uType = localStorage.getItem('uType');
     console.log(this.uType);

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

  }
  refresh(event) {
    //console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  navigateBack(){
    this.navController.navigateRoot('/menu-admin',{animated:true});
  }

  salir(){
    this.navController.navigateRoot('/login',{animated: true});

  }

}
