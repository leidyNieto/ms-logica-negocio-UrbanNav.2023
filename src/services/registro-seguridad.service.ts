import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { User } from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class RegistroSeguridadService {
  constructor(/* Add @inject to inject parameters */) {}

  async CrearUsuarioEnSeguridad(datos: any): Promise<void> {
    const ServicioSeguridadUrl = "http://localhost:3001";
  
    await fetch(`${ServicioSeguridadUrl}/user`, {
      method: 'post',
      body: JSON.stringify(datos),
      headers: {'Content-Type': 'application/json'},
    });
  }
}
