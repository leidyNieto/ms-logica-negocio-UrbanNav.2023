export namespace configuracionSeguridad {
  export const menuParadasId = "652d8ea383c5d61ac481b06c";
  export const menuDistanciaId = "652d8f0d83c5d61ac481b06d";
  export const listarAccion = "listar";
  export const editarAccion = "editar";
  export const eliminarAccion = "eliminar";
  export const guardarAccion = "guardar";
  export const descargarAccion = "descargar";
  export const enlaceMicroservicioSeguridad : string = "http://localhost:3001";
  export const mysqlConnectionString = process.env.MYSQL_CONNECTION_STRING;
  export const userMysql = process.env.USER_MYSQL;
  export const passwordMysql = process.env.PASSWORD_MYSQL;
  export const passwordStripe = process.env.PASSWORD_STRIPE??"";
}
