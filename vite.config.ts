/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    test: {
      environment: "jsdom",
      setupFiles: ["./src/tests/setup.ts"],
      testMatch: ["./src/tests/**/*.test.tsx"],
      globals: true,
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
      },
    },
  });
};
