import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {


  constructor( private http: HttpClient) { }

  login(user: string, password: string){

    const data = {
      "user": user,
      "password": password
    }
    
    return this.http.post(`${environment.url}/login`,data);
    
    /*
    return new Promise( resolve => {
      this.http.post(`${environment.url}/login`,data).subscribe(resp =>{
        if(resp['ok']){
          return
          resolve(true)
        }else{
          resolve(false);
          console.log('error login');
        }
      })
    });*/
  }
  getUsers(){
    const data={};
    return this.http.get(`${environment.url}/obtener`, data );

  }

  updateUserState(id:string,state:string){

    const body = {
      "acceso":state
    }

    return new Promise (resolve => {

    this.http.put(`${environment.url}/actulizaPre/${id}`,body).subscribe(resp =>{
      
      if(resp['ok']){
        resolve(true);
      }else{
        resolve(false);
      }
      
    });

  });

  }

  getUsersAccess(){
    const data = {
      "estatus": 1
    }
    return this.http.post(`${environment.url}/accesoShearQR`,data);

  }

  putAsistencia(id:string){
    const body = {
      "access_sala":1
    } 

    return new Promise (resolve => {
      this.http.put(`${environment.url}/actulizaAcc/${id}`,body).subscribe(resp =>{

        if(resp['ok']){
          resolve(true);
        } else {
          resolve (false);
        }
      })
    });

  }


}
