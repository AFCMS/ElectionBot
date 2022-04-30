import mongoose from "mongoose"

import Models from "./models.js"

class APIDatabase {
	constructor() {}
	createElection(
		guild_id,
		user_id,
		name,
		candidate_1,
		candidate_2,
		end_time = -1
	) {
		const e = new Models.ElectionModel({
			guild_id: guild_id,
			user: user_id,
			name: name,
			end_time: end_time,
			candidate_1: candidate_1,
			candidate_2: candidate_2,
		})
		await e.save().then(console.log).catch(console.log)
	}
	hasUserVoted(user_id, election_id) {
		Models.ElectionParticipantsModel.find({
			election_id: election_id,
			user: user_id,
		}).then((responce) => {
			return responce
		})
	}
}

export default APIDatabase
