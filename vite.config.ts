import { cpSync, existsSync, mkdirSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const PITCH_DIR = resolve(__dirname, "pitch");
const PITCH_FILE = resolve(PITCH_DIR, "Kokoro_Pitch.html");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function pitchPlugin(): Plugin {
  return {
    name: "kokoro-pitch",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];

        if (url === "/pitch" || url === "/pitch/") {
          if (!existsSync(PITCH_FILE)) {
            next();
            return;
          }
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(readFileSync(PITCH_FILE, "utf-8"));
          return;
        }

        if (url.startsWith("/pitch/")) {
          const rel = url.slice("/pitch/".length);
          const file = resolve(PITCH_DIR, rel);
          if (file.startsWith(PITCH_DIR) && existsSync(file) && statSync(file).isFile()) {
            const ext = rel.slice(rel.lastIndexOf("."));
            res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
            res.end(readFileSync(file));
            return;
          }
        }

        next();
      });
    },
    closeBundle() {
      if (!existsSync(PITCH_DIR)) return;
      const out = resolve(__dirname, "dist/pitch");
      mkdirSync(out, { recursive: true });
      cpSync(PITCH_DIR, out, { recursive: true });
      // index.html para /pitch e /pitch/
      if (existsSync(PITCH_FILE)) {
        cpSync(PITCH_FILE, join(out, "index.html"));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), pitchPlugin()],
});
