import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectionService, } from '../../services/connection.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit {

  users = [];

  uType: string;



  @Input() isActive: boolean;
  @Output() onChangeToggle = new EventEmitter<any>()

  constructor(
    private navController: NavController,
    private connectionService: ConnectionService,
    private screenOrientation: ScreenOrientation

  ) { 


  }

  ngOnInit() {
    this.connectionService.getUsers().subscribe( resp =>{
      //console.log(resp);
      const userss = resp['data'];
      this.users = userss;
     // console.log("[ THIS ]",this.users);
     this.uType = localStorage.getItem('uType');
     console.log(this.uType);
    });

    this.changeState();
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


  //id:string
  async changeToggle(id:string){
   // console.log(id);
    const state = '1'

    const update = await this.connectionService.updateUserState(id,state);
    
    if(update){
      this.ngOnInit();
     // console.log('ok ok ok');
    } else {
      console.log('Error',update);
    }

    /*
    if(this.isActive){
      this.isActive = false
      console.log("[ False ]",this.isActive,id);
      
    }else{
      this.isActive = true
      console.log("[ True ]",this.isActive,id);

    }

    */
    //this.onChangeToggle.emit({value: this.isActive})

    
  }

  changeState(){}

  navigateBack(){
    this.navController.navigateRoot('/menu-admin',{animated: true});
  }

  salir(){
    this.navController.navigateRoot('/login',{animated: true});
  }



}
