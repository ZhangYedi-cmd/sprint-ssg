import { createServer } from "vite";

/**
 * @description Dev Server
 * @param root Root path
 * @returns Server
 * **/
export async function createDevServer(root = process.cwd()){
  const server = await createServer({
    root,
  })
  return server;
}