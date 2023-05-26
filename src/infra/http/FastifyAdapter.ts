import Http from "./Http";
import fastify from 'fastify'

export default class FastifyAdapter implements Http {
  app: any

  constructor() {
    this.app = fastify();
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async function (req: any, res: any) {
      const output = await fn(req.params, req.body);
      res.send(output);
    });
  }
  listen(port: number): void {
    this.app.listen({
      port,
      host: "0.0.0.0"
    }).then(() => {
      console.log(`🚀 App running on port: ${port} with Fastify`)
    })
  }
}
