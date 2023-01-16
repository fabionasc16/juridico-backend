import axios from 'axios';
import { Response, Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

export class AuthService {
  private url = process.env.SSO_URL;

  static ROLES = {
    PROCESSO: 'SAPEJ_PROCESSO',
    RESPONSAVEL: 'SAPEJ_RESPONSAVEL',
    FERIADO: 'SAPEJ_FERIADO',
    ORGAO: 'SAPEJ_,ORGAO',
    TIPO_PROCESSO: 'SAPEJ_TIPO_PROCESSO',
    USUARIO: 'SAPEJ_USUARIO',
    ASSUNTO: 'SAPEJ_ASSUNTO',
    DASHBOARD: 'SAPEJ_DASHBOARD',
    ADMIN: 'SAPEJ_ADMINISTRADOR',
    CLASSIFICACAO: 'SAPEJ_CLASSIFICACAO',
  };

  constructor() {
    // Adiciona no Headers de todas as requests
    axios.defaults.headers.common.system = process.env.SSO_SYSTEM;
    axios.defaults.headers.common.token_system = process.env.SSO_TOKEN_SYSTEM;
  }

  async profiles(request: Request, response: Response): Promise<Response> {
    const url = process.env.SSO_URL;
    const perfis = [];

    try {
      const { data, status } = await axios.get(`${url}/profiles/`, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (data.data) {
        data.data.forEach(item => {
          const perfil: any = {};
          perfil.id = item._id;
          perfil.profile_name = item.profile_name;
          perfil.profile_description = item.profile_description;

          perfis.push(perfil);
        });
      }

      return await response.status(status).json(perfis);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async profilesSapej(request: Request, response: Response): Promise<Response> {
    const url = process.env.SSO_URL;
    const perfis = [];
    const nomeSistema = process.env.SSO_SYSTEM;

    try {
      const { data, status } = await axios.get(
        `${url}profiles/system?nomeSistema=${nomeSistema}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (data) {
        data.forEach(item => {
          const perfil: any = {};
          perfil.id = item._id;
          perfil.profile_name = item.profile_name;
          perfil.systems = item.systems;
          perfil.profile_description = item.profile_description;
          perfil.resources = item.resources;

          perfis.push(perfil);
        });
      }

      return await response.status(status).json(perfis);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async unities(request: Request, response: Response): Promise<Response> {
    const queryParams = request.url.substring(request.url.indexOf('?'));
    const url = process.env.SSO_URL;

    try {
      const { data, status } = await axios.get(
        `${url}/unities/${queryParams}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const system = 'SAPEJ';
      const units = [];
      for (let index = 0; index < data.data.length; index += 1) {
        if (
          data.data[index].systems &&
          data.data[index].systems.length > 0 &&
          data.data[index].systems[0].system_name === system
        ) {
          const element = data.data[index];
          units.push(element);
        }
      }
      data.data = units;

      return await response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async findUsuarioByCpf(request: Request, response: Response): Promise<any> {
    const url = process.env.SSO_URL;
    if (request.params.cpf) {
      try {
        const strCPF = request.params.cpf
          .replace('.', '')
          .replace('.', '')
          .replace('-', '');
        const result: any = await axios.get(`${url}/users/cpf/${strCPF}`);

        return await response.status(200).json({ id: result.data._id });
      } catch (error) {
        return response.status(404).send({
          message: 'Usuário não existe na base de dados.',
        });
      }
    }
    return response.status(200).send();
  }

  async createUsuario(request: Request, response: Response): Promise<any> {
    const url = process.env.SSO_URL;
    try {
      if (request.body.cpf) {
        try {
          const strCPF = request.body.cpf
            .replaceAll('.', '')
            .replaceAll('-', '');
          const existUser: any = await axios.get(`${url}/users/cpf/${strCPF}`);
          try {
            const edit = await axios.put(
              `${url}/users/${existUser.data._id}`,
              request.body,
            );
            return await response.status(edit.status).json(edit.data);
          } catch (error) {
            return response.status(400).send({
              message: 'Não foi possível Atualizar dados de usuário',
            });
          }
        } catch (error) {
          request.body.perfilUsuario = [request.body.perfilUsuario];
          const { status, data } = await axios.post(
            `${url}/users/`,
            request.body,
          );

          return await response.status(status).json(data);
        }
      }
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async listUsuarioByCPF(request: Request, response: Response): Promise<any> {
    const url = process.env.SSO_URL;
    try {
      const result = await axios.get(`${url}/users/cpf/${request.params.cpf}`);
      return await response.status(result.status).json(result.data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async listUsuarioById(request: Request, response: Response): Promise<any> {
    try {
      const url = process.env.SSO_URL;
      const { status, data } = await axios.get(
        `${url}/users/id/${request.params.id}`,
      );

      if (data.perfis && data.perfis.length >= 1) {
        data.perfilUsuario = data.perfis[0]._id;
      }

      return await response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async listAllUsuario(request: Request, response: Response): Promise<any> {
    const url = process.env.SSO_URL;
    const queryParams = request.url.substring(request.url.indexOf('?'));
    const userUnidadeID = request.user.unit_id;

    try {
      if (AuthService.checkRoles(AuthService.ROLES.ADMIN, request.user.roles)) {
        const { status, data } = await axios.get(
          `${url}/users/system?nomeSistema=SAPEJ`,
        );
        return await response.status(status).json(data);
      }

      const { status, data } = await axios.get(
        `${url}/users/unity${queryParams}&search=${userUnidadeID}`,
      );

      const users = [];
      for (let index = 0; index < data.data.length; index += 1) {
        const element = AuthService.convertSSOToUser(data.data[index]);
        let perfisStr = '';
        for (let j = 0; j < element.perfis.length; j += 1) {
          perfisStr = perfisStr.concat(element.perfis[j].profile_description);
        }

        element.perfilUsuario = perfisStr;

        users.push(element);
      }
      data.data = users;
      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async deleteUsuario(request: Request, response: Response): Promise<any> {
    try {
      const url = process.env.SSO_URL;
      const { status, statusText } = await axios.delete(
        `${url}/users/${request.params.id}`,
      );
      return await response.status(status).json(statusText);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async updateUsuario(request: Request, response: Response): Promise<any> {
    try {
      const url = process.env.SSO_URL;

      const { status, data } = await axios.put(
        `${url}/users/${request.params.id}`,
        request.body,
      );
      return await response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async mudarStatusUsuario(request: Request, response: Response): Promise<any> {
    try {
      const url = process.env.SSO_URL;

      const result = await axios.get(`${url}/users/id/${request.params.id}`);

      let status_atual = result.data.status;
      if (status_atual === 1) {
        status_atual = 0;
      } else {
        status_atual = 1;
      }

      const { status, data } = await axios.put(
        `${url}/users/${request.params.id}`,
        {
          status: status_atual,
        },
      );
      return await response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/auth`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async forgoPassword(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/forgotpassword`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async resetPassword(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/resetpassword`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async forgotPass(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;

      const { data, status } = await axios.post(`${url}/auth/forgotpassword`, dataFrontend, {
        headers: {
          Accept: 'application/json',
        },
      );

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async cancelRequest(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/cancelrequest`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async verifyRole(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/verify`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async verifyJWT(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/verify-token`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async logout(request: Request, response: Response): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const user: UserSSO = dataFrontend;

      const { data, status } = await axios.post(`${url}/logout`, user, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const dataFrontend: any = request.body;
      const url = process.env.SSO_URL;
      const { password } = dataFrontend;
      const token = request.headers.authorization;

      const { data, status } = await axios.post(
        `${url}/auth/reset-pass`,
        { password },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  async refreshToken(request: Request, response: Response): Promise<Response> {
    try {
      const url = process.env.SSO_URL;
      const token = request.headers.authorization;

      const { data, status } = await axios.post(
        `${url}/auth/refresh-token`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      return response.status(status).json(data);
    } catch (error) {
      return AuthService.checkError(error, response);
    }
  }

  public static async verify(token: string) {
    try {
      let dataToken: any = '';
      dataToken = await verify(
        token.replace('Bearer ', ''),
        process.env.JWT_KEY,
      );

      if (dataToken && dataToken.userid) {
        const url = process.env.SSO_URL;
        const { status, data } = await axios.get(
          `${url}/users/id/${dataToken.userid}`,
        );
        const user = data;

        if (user.perfis && user.perfis.length >= 1) {
          user.roles = [];

          for (let index = 0; index < data.perfis.length; index += 1) {
            const element = data.perfis[index];
            const system = element.systems.system_name;
            for (
              let resource = 0;
              resource < element.resources.length;
              resource += 1
            ) {
              user.roles.push(
                `${system}_${element.resources[resource].resource_name}`,
              );
            }
          }
          user.perfilUsuario = await user.perfis[0]._id;
          user.unit_id = await user.unidadeUsuario[0]._id;
        }

        return await user;
      }
    } catch (error) {
      return undefined;
    }
  }

  static checkRoles(role: string, roles: Array<string>) {
    if (role && roles) {
      const result = roles.includes(role);
      if (result) {
        return true;
      }
      return false;
    }
    return false;
  }

  static checkError(error: any, response: Response) {
    if (error && error.response) {
      return response
        .status(error.response.status)
        .json(error.response.data)
        .send();
    }
    if (error.code === 'ECONNREFUSED') {
      return response.status(404).send();
    }
    return response.status(500).send();
  }

  static convertUserSSO(modelSSO: any) {
    return {
      _id: modelSSO._id,
      nome: modelSSO.unit_name,
      status: modelSSO.status,
      systems: modelSSO.systems,
      excluido: modelSSO.excluido,
      cnpj: modelSSO.unit_cnpj,
      diretor: modelSSO.unit_director,
      created_at: modelSSO.created_at,
      updated_at: modelSSO.updated_at,
    };
  }

  static convertSSOToUnit(modelSSO: any) {
    return {
      _id: modelSSO._id,
      nome: modelSSO.unit_name,
      status: modelSSO.status,
      systems: modelSSO.systems,
      excluido: modelSSO.excluido,
      cnpj: modelSSO.unit_cnpj,
      diretor: modelSSO.unit_director,
      created_at: modelSSO.created_at,
      updated_at: modelSSO.updated_at,
    };
  }

  static convertSSOToUser(modelSSO: any) {
    return {
      _id: modelSSO._id,
      perfis: modelSSO.profiles,
      unidadeUsuario: modelSSO.unities,
      nome: modelSSO.user_name,
      status: modelSSO.user_status,
      cpf: modelSSO.user_cpf,
      perfilUsuario: '',
    };
  }
}
