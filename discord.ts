import { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } from 'discord.js';
import { storage } from './storage';

export function setupDiscordBot() {
  const TOKEN = process.env.TOKEN;
  const PIX = process.env.PIX || "YOUR_PIX_KEY";
  const NOME_PIX = process.env.NOME_PIX || "YOUR_NAME";

  if (!TOKEN) {
    console.log("No Discord TOKEN found. Bot will not start.");
    return;
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  client.once(Events.ClientReady, () => {
    console.log(`Bot online como ${client.user?.tag}`);
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "criar") {
        const valor = interaction.options.getInteger("valor");
        const jogo = interaction.options.getString("jogo");

        if (!valor || !jogo) {
          await interaction.reply({ content: "Valor ou jogo não informados.", ephemeral: true });
          return;
        }

        const match = await storage.createMatch({
          creatorId: interaction.user.id,
          creatorName: interaction.user.username,
          game: jogo,
          amount: valor,
          status: "pending"
        });

        const embed = new EmbedBuilder()
          .setTitle("🔥 Nova Partida")
          .setDescription(
            `👤 Criador: ${interaction.user}\n🎮 Jogo: ${jogo}\n💰 Valor: ${valor}`
          )
          .setColor("Green");

        const aceitar = new ButtonBuilder()
          .setCustomId(`aceitar_${match.id}`)
          .setLabel("Aceitar")
          .setStyle(ButtonStyle.Success);

        const sugerir = new ButtonBuilder()
          .setCustomId(`sugerir_${match.id}`)
          .setLabel("Sugerir")
          .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(aceitar, sugerir);

        await interaction.reply({ embeds: [embed], components: [row] });
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId.startsWith("aceitar_")) {
        const matchId = parseInt(interaction.customId.split("_")[1], 10);
        
        try {
          const match = await storage.getMatch(matchId);
          if (!match) {
            return interaction.reply({ content: "Partida não encontrada.", ephemeral: true });
          }

          if (match.status !== "pending") {
            return interaction.reply({ content: "Esta partida já foi aceita ou concluída.", ephemeral: true });
          }

          if (interaction.user.id === match.creatorId) {
            return interaction.reply({ content: "Você não pode aceitar sua própria partida.", ephemeral: true });
          }

          await storage.updateMatch(matchId, {
            acceptedById: interaction.user.id,
            acceptedByName: interaction.user.username,
            status: "accepted"
          });

          await interaction.reply({ content: `⚠️ ${interaction.user} aceitou a partida. Confira o pagamento via PIX.` });

          await interaction.user.send(`
💰 Para completar a aposta, faça o pagamento via PIX:

PIX: ${PIX}
Nome: ${NOME_PIX}
Valor: ${match.amount}
          `);
        } catch (error) {
          console.error("Error accepting match:", error);
          await interaction.reply({ content: "Erro ao aceitar a partida.", ephemeral: true });
        }
      }
    }
  });

  client.login(TOKEN).catch(console.error);
}
