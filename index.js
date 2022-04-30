import Discord from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { exit } from "process"
import mongoose from "mongoose"
import "dotenv/config"

import "./uptime_server.js"

import Models from "./models.js"

mongoose
	.connect(process.env["MONGODB_URL"])
	.then(console.log("Connected to MongoDB"))
	.catch((err) => console.error("Connection to MongoDB failed! Error: " + err))

//mongoose.model("elections", Models.ElectionModel)
//mongoose.model("elections_participants", Models.ElectionParticipantsModel)

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
	new SlashCommandBuilder().setName("ping").setDescription("Stupid command")
)

commands.push(
	new SlashCommandBuilder()
		.setName("create")
		.setDescription("Create an Election")
		.addStringOption((option) =>
			option.setName("name").setDescription("Election Name").setRequired(true)
		)
		.addUserOption((option) =>
			option
				.setName("candidate_1")
				.setDescription("First candidate")
				.setRequired(true)
		)
		.addUserOption((option) =>
			option
				.setName("candidate_2")
				.setDescription("Second candidate")
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option
				.setName("given_role")
				.setDescription("Role that will be given to the winner")
				.setRequired(false)
		)
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel where the election will take place")
				.setRequired(false)
				.addChannelTypes(Discord.Constants.ChannelTypes.GUILD_TEXT)
		)
)

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`)

	client.application.commands.set(commands)

	if (process.env["DEBUG_GUILD_ID"]) {
		const guild = client.guilds.resolve(process.env["DEBUG_GUILD_ID"])

		guild.commands.set(commands).catch(console.log)
	}
})

client.on("interactionCreate", async (interaction) => {
	if (interaction.isCommand()) {
		if (interaction.commandName === "ping") {
			await interaction.reply("Pong!")
		} else if (interaction.commandName === "create") {
			await interaction.reply("Not implemented yet")
		}
	}
	//console.log(interaction)
})

client.login(process.env["DISCORD_TOKEN"])
