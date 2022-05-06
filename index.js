import Discord from "discord.js"
import { exit } from "process"
import mongoose from "mongoose"
import "dotenv/config"

import "./uptime_server.js"

import Models from "./models.js"
import commands from "./commands.js"

mongoose
	.connect(process.env["MONGODB_URL"])
	.then(console.log("Connected to MongoDB"))
	.catch((err) => console.error("Connection to MongoDB failed! Error: " + err))

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
			// Retreive options
			const election_name = interaction.options.getString("name")
			const candidate_1 = interaction.options.getUser("candidate_1")
			const candidate_2 = interaction.options.getUser("candidate_2")

			let channel = interaction.options.getChannel("channel")

			if (!channel) {
				channel = interaction.channel
			}

			console.log(channel)

			// Check if database

			Models.ElectionModel.find(
				{
					name: election_name,
					guild_id: interaction.guildId,
				},
				(err, dogs) => {
					console.log(err)
					console.log(dogs)
				}
			)

			// Create database entry

			const e = Models.ElectionModel({
				guild_id: interaction.guildId,
				user: interaction.user.id,
				name: election_name,
				candidate_1: candidate_1.id,
				candidate_2: candidate_2.id,
			})

			e.save()
				.then((out) => {
					console.log(out)
					const e = Discord.MessageEmbed()
					interaction.reply({ content: "Done: " + out._id, ephemeral: true })
				})
				.catch((err) => {
					interaction.reply("Oops, there was an error: " + err)
				})
		} else if (interaction.commandName === "delete") {
			const election_id = interaction.options.getString("id")

			Models.ElectionModel.findByIdAndRemove(election_id, function (err, docs) {
				if (err) {
					console.log(err)
					interaction.reply({ content: "Error", ephemeral: true })
				} else {
					console.log("Removed Election : ", docs)
					interaction.reply({ content: "Election Removed!", ephemeral: true })
				}
			})

			//Models.ElectionParticipantsModel
			//Models.ElectionParticipantsModel.findByElectionAndRemove(election_id, function (err, docs) {})
		} else if (interaction.commandName === "list") {
			Models.ElectionModel.find()
				.byGuild(interaction.guildId)
				.then((elections) => {
					interaction.reply(JSON.stringify(elections))
				})
				.catch((err) => {
					interaction.reply("Not working")
				})
		}
	}
	//console.log(interaction)
})

function buildElectionEmbeed(doc) {
	const e = Discord.MessageEmbed().setTitle(doc.name)
}

client.login(process.env["DISCORD_TOKEN"])
