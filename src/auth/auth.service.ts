import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/model/users.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //importar jwt para generar token
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, //importar en authmodule moongoseModule
  ) {}
  /**
   * Metodo para registrar usuarios a partir del dto de register.dto
   * @param userBody datos enviados al controlador
   * @returns
   */
  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const userParse = { ...user, password: await generateHash(password) };
    return this.userModel.create(userParse);
  }
  /**
   * Metodo para verificar si el usuario existe en base de datos, comparar el hasgh de la contraseña,
   * enviar token.
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody; //desestructurar el userLoginBody para sacar password encriptado
    const userExist = await this.userModel.findOne({
      email: userLoginBody.email,
    }); // verificar en la base de datos el correo electronico si existe
    if (!userExist) throw new HttpException('Not Found', HttpStatus.NOT_FOUND); //validacion sino existe el email
    const ischeck = await compareHash(password, userExist.password); // comparar el hash (pass, passencript)
    if (!ischeck)
      // si ischeck es true la contraseña coincide
      throw new HttpException('password invalid', HttpStatus.UNAUTHORIZED);
    const userFlat = userExist.toObject(); //convirtiendo en objecto la data
    delete userFlat.password; //eliminando del objeto la propiedad de password
    const payload = {
      id: userFlat._id,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      token,
      user: userFlat,
    };
    return data;
  }
}
