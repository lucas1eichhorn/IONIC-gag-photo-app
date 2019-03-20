import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {
imagenes:ArchivoSubir[]=[];
  constructor(public toastCtrl: ToastController,public afDB: AngularFireDatabase) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase(archivo: ArchivoSubir) {
    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast("Cargando...");

      let storeRef=firebase.storage().ref();
      let nombreArchivo:string=new Date().valueOf().toString();//3213312434
  //crear tarea de subir archivo
      let uploadTask:firebase.storage.UploadTask=
      
        storeRef.child(`img/${nombreArchivo}`).putString(archivo.img,'base64',{contentType:'image/jpeg'});
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{},//saber el porcentaje de cuantos bytes se han subido
          (error)=>{//error
            console.log("Error en la carga");
            console.log(JSON.stringify(error));
            this.mostrar_toast(JSON.stringify(error));
            reject();

          },
          ()=>{
            //todo ok
            console.log("Archivo subido con éxito");
            this.mostrar_toast("Archivo subido con éxito");

            let url=uploadTask.snapshot.downloadURL;//obtenemos la url de la subida
            this.subir_post(archivo.titulo,url,nombreArchivo);
            this.mostrar_toast("subiendo creado");
            resolve();
          }
          
          )
      
     })
    return promesa;
  }
  subir_post(titulo:string,url:string,nombreArchivo:string){
  let post:ArchivoSubir={
    img:url,
    titulo:titulo,
    key:nombreArchivo
  };
  console.log(JSON.stringify(post));
 // this.afDB.list('/post').push(post);
 this.afDB.object(`/post/${nombreArchivo}`).update(post); //subimos el registro del post a firebase DB
 this.imagenes.push(post);//agregamos el post a mi array local
 this.mostrar_toast("Post creado");
}
  mostrar_toast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
//interface permite definir con TS la estructura de una entidad,
// para que controle tu estructura TS y asi evitar errores
interface ArchivoSubir {
  titulo: string;
  img: string;
  key?;
}
