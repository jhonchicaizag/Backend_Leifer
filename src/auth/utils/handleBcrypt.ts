import * as bcrypts from 'bcryptjs';

const salOrRounds = 10;
/**
 * Funcion para generar o encriptar la contraseña
 * @param passwordPlain contraseña a encriptar
 * @returns un password encriptado
 */
async function generateHash(passwordPlain: string): Promise<string> {
  const hash = await bcrypts.hash(passwordPlain, salOrRounds);
  return hash;
}
/**
 * Funcion para comparara la contraseña con el hash y verifica si coinciden
 * @param plain contraseña en texto plano
 * @param hash contraseña encriptada
 * @returns true, false
 */
async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcrypts.compare(plain, hash);
}

export { generateHash, compareHash };
