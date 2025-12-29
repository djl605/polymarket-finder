/**
 * Test script to verify Discord webhook is working
 * Run with: npm run test:discord
 */

import dotenv from 'dotenv';
import { WebhookClient, EmbedBuilder } from 'discord.js';

// Load environment variables
dotenv.config();

async function testDiscordWebhook() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('❌ Error: DISCORD_WEBHOOK_URL not found in environment variables');
    console.error('   Make sure you have a .env file with DISCORD_WEBHOOK_URL set');
    process.exit(1);
  }

  console.log('📤 Sending test message to Discord webhook...');

  try {
    const webhook = new WebhookClient({ url: webhookUrl });

    const embed = new EmbedBuilder()
      .setColor(0x00ff00) // Green color
      .setTitle('✅ Discord Webhook Test')
      .setDescription('Your Discord webhook is working correctly!')
      .addFields(
        { name: 'Status', value: '🟢 Connected', inline: true },
        { name: 'Timestamp', value: new Date().toLocaleString(), inline: true }
      )
      .setFooter({ text: 'Polymarket Bot - Test Message' })
      .setTimestamp();

    await webhook.send({
      username: 'Polymarket Bot',
      embeds: [embed],
    });

    console.log('✅ Test message sent successfully!');
    console.log('   Check your Discord channel for the message.');
    
    // Clean up
    webhook.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error sending test message:');
    console.error('   ', error instanceof Error ? error.message : error);
    console.error('\n💡 Tips:');
    console.error('   - Make sure your webhook URL is valid');
    console.error('   - Check that the webhook hasn\'t been deleted');
    console.error('   - Verify you have internet connection');
    process.exit(1);
  }
}

testDiscordWebhook();

