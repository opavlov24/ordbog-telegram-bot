import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { handleIncomingUpdate } from './model/bot.js';

const logger = new Logger();

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const token = event.headers['x-telegram-bot-api-secret-token'];

  if (event.body && token) {
    const body = JSON.parse(event.body);
    await handleIncomingUpdate({
      body,
      token
    }).catch((err) => logger.error('Error: ' + err));
  }

  return {
    statusCode: 200,
    body: 'OK'
  };
};
