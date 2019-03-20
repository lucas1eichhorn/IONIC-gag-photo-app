import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';
import { Component } from '@angular/core';
import { ViewController } from "ionic-angular"

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo: string ="";
  imagenPreview: string ="";
  imagen64: string;
  constructor(private viewCtrl: ViewController, private camera: Camera, private imagePicker: ImagePicker, public _cap: CargaArchivoProvider) {
  }

  //funcion que cierra el modal
  cerrar_modal() {
    this.viewCtrl.dismiss();
  }
  crear_post() {
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }
    this._cap.cargar_imagen_firebase(archivo).then(()=>this.cerrar_modal());
    
  }
  mostrar_camara() {
    console.log("mostrar camara");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;
      //this.imagenPreview = imageData;
      //console.log("imagen");
      //console.log(this.imagenPreview);
    }, (err) => {
      // Handle error
      console.log("Error en camara", JSON.stringify(err));
    });
  }

  seleccionar_foto() {
    console.log("seleccionar foto");
    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //console.log('Image URI: ' + results[i]);
        this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
        this.imagen64 = results[i];
      }
    }, (err) => { console.log("Error en selector", JSON.stringify(err)) });
  }
}
