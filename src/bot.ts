import TelegramBot from 'node-telegram-bot-api'
import { FriendRepository } from './repository';
import { FriendService } from './service/friends';
import dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();

const TOKEN = process.env.TOKEN_TELEGRAM || '';

const bot = new TelegramBot(TOKEN, { polling: true });

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

// bot.onText(/\/update_friends/, async (msg) => {
//     console.log('Updating friends');

//     const result = await friendsService.updateFriends();

//     bot.sendMessage(msg.chat.id, `Friends updated: ${result.length} friends`);
// });
