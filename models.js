import mongoose from "mongoose"

const ElectionModel = new mongoose.Schema({
	guild_id: { type: Number, required: true },
	user: { type: Number, required: true },
	name: { type: String, trim: true, required: true },
	end_time: { type: Number, default: -1, required: true },
	candidate_1: { type: String, required: true },
	candidate_2: { type: String, required: true },
	candidate_3: { type: String },
	candidate_4: { type: String },
	candidate_5: { type: String },
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
	ElectionModel: mongoose.model("elections", ElectionModel),
	ElectionParticipantsModel: mongoose.model(
		"elections_participants",
		ElectionParticipantsModel
	),
}

//module.exports = e
export default e
