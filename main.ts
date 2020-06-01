import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { executeQuery } from "./graphql.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
router.get("/", (context) => {
  context.response.body = { hola: "Hello world!" };
});

router.post("/graphql", async ({ request, response }) => {
  const req = await request.body();
  try {
    console.log(req);
    const res = await executeQuery(req.value.query);
    response.body = res;
  } catch (e) {
    response.body = e;
  }
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
