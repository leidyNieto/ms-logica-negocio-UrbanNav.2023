//este codigo se encuentra en la pagina de loopback
//se coloca la liberia npm i @loopback/authentication y npm i @loopback/security
// se coloca la libreria npm i parse-bearer-token
import {AuthenticationStrategy} from '@loopback/authentication';
import {AuthenticationBindings} from '@loopback/authentication/dist/keys';
import {AuthenticationMetadata} from '@loopback/authentication/dist/types';
import {inject} from '@loopback/context';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';


export class AuthStrategy implements AuthenticationStrategy {
    name: string = 'auth';

    constructor(
    //inyector de un metadata
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],
    ) {}

    /**
     * autentificación de un usuario frente a una acción en la base de datos
     * @param request la solicitud con el token
     * @returns perfil de usuario o undefined cuando no ahi permiso
     */
    async authenticate(request: Request): Promise<UserProfile | undefined> {
      let token = parseBearerToken(request);
      if(token){
       let idMenu:string = this.metadata[0].options![0];
       let accion:string = this.metadata[0].options![1];
       console.log(this.metadata);
       console.log("Conectar con ms-seguridad")

       let continuar : boolean = false;
         if(continuar){
            let perfil: UserProfile = Object.assign({
             permitido : "OK"
            });
            return perfil;
         }else{
           return undefined;
         }
         }
      throw new HttpErrors[401]("no se puede ejecutar la acción por falta de un token.");
     }
   }
