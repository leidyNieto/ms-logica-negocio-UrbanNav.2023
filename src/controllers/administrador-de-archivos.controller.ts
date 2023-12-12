//este codigo se reutiliza
//se instalan la libreria npm i multer que es para la administración de archivos,
// npm i multer , npm i @types/multer -D , npm i @loopback/authentication
import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import path from 'path';
import {promisify} from 'util';
import {ConfiguracionGeneral} from '../config/configuracion.general';

import fs from 'fs';
import multer from 'multer';
const readdir = promisify(fs.readdir);

export class AdministradorDeArchivosController {
  constructor() {}

  //@authenticate('admin')
  @post('cargar-archivo-user', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoUser(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoUser,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }

  @post('cargar-archivo-driver-id', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoDriverId(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoDriverId,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }

  @post('cargar-archivo-driver-licencia', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoDriverLicencia(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoDriverLicense,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }
  @post('cargar-archivo-car-Tecno', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoCarTecno(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoDriverCar2,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }

  @post('cargar-archivo-driver-tarjetaPropiedad', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoDriverTarjetaPro(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoDriverTarjetaPro,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }

  @post('cargar-archivo-car-soat', {
    responses: {
      200: {
        //se resive un objeto de formato json
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async cargarArchivoCarSoat(
    //tiene dos parametros
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    //ruta del archivo va a ser _dirname
    //ConfiguraciónGeneral.cargarArchivoUser para saber donde se va a guardar la carpeta
    const filePath = path.join(
      __dirname,
      ConfiguracionGeneral.carpetaArchivoDriverCar,
    );
    //se tiene un metodo que se va a tener localmente y se llama StoreFileToPath
    // que tiene la carpeta donde se va a guardar, y el campo de user
    //como va a llegar descrito
    let res = await this.StoreFileToPath(
      filePath,
      ConfiguracionGeneral.campo,
      request,
      response,
      ConfiguracionGeneral.extensionesImagenes,
    );
    //si la respuesta es true
    if (res) {
      //tenemos el donde del archivo para retornar
      const filename = response.req?.file?.filename;
      if (filename) {
        return {
          filename: filename,
        };
      }
    }
    return res;
  }

  /**
   * devolver una configuración para el almacenamiento multer
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      // destination es donde se va a almacenar
      destination: function (req, file, cb) {
        cb(null, path);
      },
      //como lo vamos a guardar
      filename: function (req, file, cb) {
        //se va a guardar con el nombre de la fecha y el nombre original
        //se hace esto para que no tengan el nombre igual
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * almacenar el archivo en una ruta específica
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    filedname: string,
    request: Request,
    response: Response,
    acceptedExtensions: string[],
  ): Promise<object> {
    //console.log(storePath);
    return new Promise((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      //console.log(storage);
      //este metodo llama a la configuración de multer
      const upload = multer({
        storage: storage,
        //almacenar el archivo, lo hace obteniendo las extensiones y lo volca a mayuscula y
        //obtiene la extensión para poder evaluar
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          console.log(ext);
          //si la extensión esta en el arreglo de extensiones aceptadas,entonces retorna el
          // callbalck en otro caso dice que no esta soportado
          if (acceptedExtensions.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400](
              'La extensión del archivo no es admitida para su almacenamiento',
            ),
          );
        },
        //objete de limite para el peso, calidad,etc
        limits: {},
        //es unico archivo,aunque se podria poner para varios
      }).single(filedname);
      //se procede a cargar el archivo
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        // que lo puede resolver correctamente o rechazar en caso de que alla algun error
        resolve(response);
      });
    });
  }

  /**metodo para descargar archivos */

  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          //string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'una lista de archivos',
      },
    },
  })
  //retorna lista de archivos con un numero que identifica el tipo de archivo
  async ObtenerListaDeArchivo(@param.path.number('type') type: number) {
    const folderPath = this.ObtenerArchivosPorTipo(type);
    const files = await readdir(folderPath);
    return files;
  }

  //obtener un archivo con un tipo y un nombre especificoa, de esta manera se obtiene un unico archivo
  @get('/ObtenerArchivo/{type}/{name}')
  @oas.response.file()
  async downloadFileByName(
    @param.path.number('type') type: number,
    @param.path.string('name') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    //se obtiene la ruta especifica de cada carpeta,por cada tipo
    const folder = this.ObtenerArchivosPorTipo(type);
    //se valida el nombre del archivo
    const file = this.ValidadNombrreDeArchivo(folder, filename);
    //se descarga el archivo
    response.download(file, filename);
    return response;
  }

  /**
   *
   */
  //recibe un tipo y dependiento del tipo retorna una ruta especifica
  private ObtenerArchivosPorTipo(tipo: number) {
    let filePath = '';
    switch (tipo) {
      //amusement
      case 1:
        filePath = path.join(
          __dirname,
          ConfiguracionGeneral.carpetaArchivoUser,
        );
        break;
      case 3:
        break;
    }
    return filePath;
  }

  /**
   * validate file names to prevent then goes beyond the designated directory
   * @param fileName - File name
   */
  //valida si el archivo con esa carpeta y ese nombre existe
  private ValidadNombrreDeArchivo(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    //si no dice que el archivo es invalido
    throw new HttpErrors[400](`nombre de archivo invalido: ${fileName}`);
  }
}
