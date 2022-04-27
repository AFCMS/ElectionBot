const { Client, Intents }= require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { exit } = require("process")

const { ElectionDatabase } = require("./api.js")

require("dotenv").config()

//console.log(config)

//console.log(config.guildid)

// Error if missing configuration
if (!config.token) {
	console.error("Error: Missing configurations! See .env.example")
	exit(1)
}

console.log(
	ElectionDatabase.create_election("fdf", "Pre", ["Valérie"], 1243, 10, 0)
)

ElectionDatabase.db.all("SELECT * FROM elections", (err, rows) => {
	console.log(rows)
})

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_INTEGRATIONS,
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

	const guild = client.guilds.resolve(process.env.GUILD_ID)

	guild.commands.set(commands).catch(console.log)
})

process.on("SIGINT", () => {
	ElectionDatabase.db.close()
	client.destroy()
})

client.login(process.env.TOKEN)
