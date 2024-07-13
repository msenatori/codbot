import TelegramBot from 'node-telegram-bot-api';
import { FriendRepository } from './repository';
import { FriendService } from './service/friends';
import dotenv from 'dotenv';
import { connectDB } from './db';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const TOKEN = process.env.TOKEN_TELEGRAM || '';
const URL = process.env.URL || ''; // Your public URL
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(TOKEN);

// Webhook setup
bot.setWebHook(`${URL}/bot${TOKEN}`);

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const friendRespository = new FriendRepository();
const friendsService = new FriendService(friendRespository);

connectDB();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Vofi, Vofi, sabes quien esta?');
});

bot.onText(/\/on/, async (msg) => {
  console.log('Turning on');

  const friends = await friendsService.getFriends();

  if (friends.length === 0) {
    bot.sendMessage(msg.chat.id, 'No hay nadie pa!');
    return;
  }

  const header = 'User              | State     | Play        \n' +
                 '------------------|-----------|-------------\n';

  const rows = friends.map(f => {
    const user = f.user.padEnd(18);
    const state = f.state.padEnd(10);
    const play = f.play.padEnd(12);
    
    return `${user} | ${state} | ${play}`;
  }).join('\n');

  const message = `<pre>${header}${rows}</pre>`;

  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is listening on ${PORT}`);
});