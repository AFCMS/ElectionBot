import { SlashCommandBuilder } from "@discordjs/builders"

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

commands.push(
	new SlashCommandBuilder()
		.setName("delete")
		.setDescription("Delete an Election")
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("Id of the Election")
				.setRequired(true)
		)
)

commands.push(
	new SlashCommandBuilder()
		.setName("close")
		.setDescription("Force close an Election")
		.addStringOption((option) =>
			option
				.setName("id")
				.setDescription("Id of the Election")
				.setRequired(true)
		)
)

commands.push(
	new SlashCommandBuilder().setName("list").setDescription("List Elections")
)

export default commands
