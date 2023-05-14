import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Update } from 'telegraf/types';
import { extractSounds } from '../app.js';

export class HandleUpdateRequest {
  token: string;
  body: string;

  constructor(token: string, body: string) {
    this.token = token;
    this.body = body;
  }
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
  const requestedUrl = ctx.message.text;
  const sounds = extractSounds(requestedUrl);
  (await sounds).forEach((sound) => {
    ctx.replyWithAudio(sound.url, { caption: sound.name });
  });
});

const validateToken = (token: string) => {
  return process.env.SECURITY_TOKEN == token;
};

export const handleIncomingUpdate = async (update: HandleUpdateRequest) => {
  if (validateToken(update.token)) {
    await bot.handleUpdate(update.body as unknown as Update);
  }
};
