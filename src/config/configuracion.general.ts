export namespace ConfiguracionGeneral {
  //ruta donde se va a guardar la carpeta
  export const carpetaArchivoUser: string = '../../archivos/user';
  export const carpetaArchivoDriverId: string = '../../archivos/driver/id';
  export const carpetaArchivoDriverLicense: string =
    '../../archivos/driver/licencia';
  export const carpetaArchivoDriverCar: string = '../../archivos/car/soat';
  export const carpetaArchivoDriverTarjetaPro: string =
    '../../archivos/driver/tarjetaPro';
  export const carpetaArchivoDriverCar2: string =
    '../../archivos/car/tecnomecanico';
  // como llega el campo de usuario
  export const campo: string = 'file';
  //es un arreglo que permite definir las extensiones admitidas por los archivos
  export const extensionesImagenes: string[] = [
    '.JPG',
    '.PNG',
    '.JPEG',
    '.PDF',
  ];
}
