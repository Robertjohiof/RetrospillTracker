interface ImportMetaEnv {
  readonly VITE_USE_MOCKS: string;
  // legg til flere VITE_ variabler her hvis vi trenger senere
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
