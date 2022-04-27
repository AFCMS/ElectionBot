import Discord from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { exit } from "process"
import mongoose from "mongoose"
import "dotenv/config"

mongoose
	.connect(process.env["MONGODB_URL"])
	.then(console.log("Connected to MongoDB"))

//const { ElectionDatabase } = require("./api.js")

//console.log(config)

//console.log(config.guildid)

// Error if missing configuration
if (!process.env["DISCORD_TOKEN"]) {
	console.error("Error: Missing configurations! See config.json.example.")
	exit(1)
}

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
	],
})

const commands = []

commands.push(
	new SlashCommandBuilder()
		.setName("shutupbot")
		.setDescription("Stupid command")
)

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`)

	if (process.env["DEBUG_GUILD_ID"]) {
		const guild = client.guilds.resolve(config.guildid)

		guild.commands.set(commands).catch(console.log)
	}
})

client.login(process.env["DISCORD_TOKEN"])
