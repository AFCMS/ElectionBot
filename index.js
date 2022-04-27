const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { exit } = require("process")
const sqlite3 = require("sqlite3").verbose()

const { ElectionDatabase } = require("./api.js")

const config = require("./config.json")

//console.log(config)

//console.log(config.guildid)

// Error if missing configuration
if (!config.token) {
	console.error("Error: Missing configurations! See config.json.example.")
	exit(1)
}

console.log(
	ElectionDatabase.create_election("fdf", "Pre", ["Valérie"], 1243, 10, 0)
)

ElectionDatabase.db.all("SELECT * FROM elections", (err, rows) => {
	console.log(rows)
})

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

	const guild = client.guilds.resolve(config.guildid)

	guild.commands.set(commands).catch(console.log)
})

process.on("SIGINT", () => {
	ElectionDatabase.db.close()
	client.destroy()
})

client.login(config.token)
