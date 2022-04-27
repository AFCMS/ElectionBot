const fs = require("fs")
const { exit } = require("process")
const sqlite3 = require("sqlite3").verbose()

class ElectionDatabase {
	constructor() {
		this.db = new sqlite3.Database(
			"./database.db",
			sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
			(err) => {
				if (err && err.code == "SQLITE_CANTOPEN") {
					createDatabase()
					return
				} else if (err) {
					console.log("Getting error " + err)
					exit(1)
				}
			}
		)
		const schema = fs.readFileSync("./schema/database.sql", "utf8")
		console.log(schema)
		this.db.run(schema)
	}
	has_user_voted(election_id, user_id) {
		this.db.all(
			`SELECT * FROM election_participants WHERE (election_id = ${election_id} and user = ${user_id})`,
			(err, rows) => {
				if (err) {
					console.log(err)
					return null
				} else {
					console.log(rows)
					//name = rows[0].name
				}
			}
		)
	}
	create_election(
		guild_id,
		name,
		candidates,
		expire_date,
		fraud_percent,
		fraud_favorised
	) {
		this.db.exec(
			`INSERT INTO elections (guild_id, name, candidate1, fraud_percentage, fraud_favorised, end_time)
			values (${guild_id}, ${name}, ${candidates[0]}, ${fraud_percent}, ${fraud_favorised}, ${expire_date});
		`,
			(err) => {
				if (err != null) {
					return false
				}
			}
		)
		return true
	}
}

exports.ElectionDatabase = new ElectionDatabase()
