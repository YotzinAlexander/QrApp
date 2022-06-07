import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ConnectionService } from 'src/app/services/connection.service';


@Component({
  selector: 'app-lector',
  templateUrl: './lector.page.html',
  styleUrls: ['./lector.page.scss'],
})
export class LectorPage implements OnInit {

  id: any;

  users = [];

  uType: string;



  constructor(
    private navController:NavController,
    private BarCodeScan: BarcodeScanner,
    private alertController: AlertController,
    private connectionService: ConnectionService

  ) { }



  ngOnInit() {
    const search =  this.connectionService.getUsersAccess().subscribe( resp =>{
      //console.log(resp);
      const userss = resp['data'];
      this.users = userss;
     //console.log("[ THIS ]",this.users);

    });

    this.uType = localStorage.getItem('uType');
     console.log(this.uType);
    
  }

  lectorQr(){
    this.BarCodeScan.scan().then(barcodeData => {
      this.id = barcodeData.text;
      if(barcodeData.text==null){
        this.alertErr();
       } else {
        this.alert();

      }

    }).catch(err =>{
      console.log('Error', err);
    })
  }

  navigateBack(){
    this.navController.navigateRoot('/menu-admin',{animated:true});
  }

  async alert(){
    const alert = await this.alertController.create({
      header:'Mensaje de asistencia',
      message: '¿Desea guardar la asistencia?',
      buttons: [
        {
          text:'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text:'Asistencia',
          handler: () =>{
            this.asistencia();
          }
        }]
    })
    await alert.present();
  }

  async alertErr(){
    const alert = await this.alertController.create({
      header:'Eror de lectura',
      message: 'Favor de volver a leer',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

 async asistencia(){

  const check = await this.connectionService.putAsistencia(this.id);

  if (!check){
    console.log("TODO FINE");
     this.ngOnInit();
  } else {
    console.log("NEL COMPA");
  }

  }

  salir(){
    this.navController.navigateRoot('/login',{animated: true});

  }

}
