import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/** Em desenvolvimento, atende /api/* com as mesmas funções que rodam na Vercel. */
function localApi() {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z-]+)(?:\?|$)/);
        if (!match) return next();
        try {
          const module = await server.ssrLoadModule(`/api/${match[1]}.js`);
          await module.default(req, res);
        } catch (error) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: `Rota /api/${match[1]} não encontrada.`, detail: error.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Disponibiliza as variáveis do .env (sem prefixo VITE_) só para as funções de servidor locais.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return { plugins: [react(), localApi()] };
});
