declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECURITY_TOKEN: string;
      TELEGRAM_BOT_TOKEN;
    }
  }
}

export {}
