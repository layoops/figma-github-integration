/// <reference types="vite/client" />
type ImportMetaEnv = {
  readonly VITE_GITHUB_TOKEN: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
