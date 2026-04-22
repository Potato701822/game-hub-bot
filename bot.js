const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => { console.log('Bot Online!'); });

client.on('messageCreate', async (message) => {
    if (message.content === '!jogos') {
        const { data: games } = await supabase.from('games').select('*');
        if (!games || games.length === 0) return message.reply("Nenhum jogo encontrado.");
        const embed = new EmbedBuilder()
            .setTitle('🎮 Biblioteca')
            .setDescription('Jogos disponíveis:')
            .setColor('#0099ff');
        games.forEach(g => embed.addFields({ name: g.title, value: `[Baixar](${process.env.DASHBOARD_URL})` }));
        message.reply({ embeds: [embed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
