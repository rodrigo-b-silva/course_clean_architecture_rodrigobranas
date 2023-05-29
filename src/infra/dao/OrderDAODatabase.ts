import OrderDAO from "../../application/dao/OrderDAO";
import Connection from "../database/Connection";

export default class OrderDAOatabase implements OrderDAO {
  constructor(readonly connection: Connection) { }

  async get(code: string): Promise<any> {
    return await this.connection.query("select code, total::float from ccca.order where code = $1", [code]);
  }

  async findAll(): Promise<any> {
    return await this.connection.query("select code, total::float from ccca.order", []);
  }
}
