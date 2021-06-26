import { Telegraf } from 'telegraf'
import * as https from 'https'
import * as cheerio from 'cheerio';

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id)
  ctx.leaveChat()
})

bot.on('text', ctx => {
    const requestedUrl = ctx.message.text
    if (!requestedUrl.startsWith('https://ordnet.dk/ddo/ordbog')) {
        return
    }

    const request = https.request(requestedUrl, res => {
        let receivedData = '';
        res.on('data', chunk => receivedData += chunk)
        res.on('end', () => {
            const $ = cheerio.load(receivedData);
            $('.lydskrift').each((_, elm) => {
                $('audio a', elm).each((_, a) => {
                    const url = $(a).attr("href")
                    ctx.replyWithAudio(url, {caption: $(elm).text()})
                })
            })
        })
    })
    request.end()
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
