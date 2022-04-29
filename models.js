import mongoose from "mongoose"

const ElectionModel = new mongoose.Schema({
	guild_id: { type: Number, required: true },
	name: { type: String, trim: true },
	end_time: { type: Number, required: true },
	message_id: { type: Number },
})

const ElectionParticipantsModel = new mongoose.Schema({
	user: { type: String, required: true },
	election_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "elections",
		required: true,
	},
	candidate_id: { type: Number, required: true },
})

const e = {
	ElectionModel,
	ElectionParticipantsModel,
}

//module.exports = e
export default e
