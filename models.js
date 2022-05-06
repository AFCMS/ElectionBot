import mongoose from "mongoose"

// Schema Definition

const ElectionSchema = new mongoose.Schema({
	guild_id: { type: Number, required: true },
	user: { type: Number, required: true },
	name: { type: String, trim: true, required: true },
	end_time: { type: Number, default: -1, required: true },
	is_closed: { type: Boolean, default: false, required: true },
	closed_by: { type: Number },
	candidate_1: { type: String, required: true },
	candidate_2: { type: String, required: true },
	candidate_3: { type: String },
	candidate_4: { type: String },
	candidate_5: { type: String },
	message_id: { type: Number },
})

const ElectionParticipantsSchema = new mongoose.Schema({
	user: { type: String, required: true },
	election_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "elections",
		required: true,
	},
	candidate_id: { type: Number, required: true },
})

// Methods

ElectionSchema.methods.findParticipants = function () {
	return mongoose.model("elections_participants").find({ id: this._id })
}

ElectionSchema.statics.findParticipants = function (election_id) {
	return mongoose.model("elections_participants").find({ id: election_id })
}

ElectionSchema.query.byGuild = function (guild_id) {
	return this.where({ guild_id: guild_id })
}

ElectionParticipantsSchema.query.byElection = function (election_id) {
	return this.where({ election_id: election_id })
}

ElectionParticipantsSchema.methods.findByElectionAndRemove = function (
	election_id
) {
	this.deleteMany().byElection(election_id).then(console.log)
}

// Models Creation

const ElectionModel = mongoose.model("elections", ElectionSchema)
const ElectionParticipantsModel = mongoose.model(
	"elections_participants",
	ElectionParticipantsSchema
)

ElectionParticipantsModel.find()

// Export Models

export default {
	ElectionModel,
	ElectionParticipantsModel,
}
