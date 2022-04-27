CREATE TABLE IF NOT EXISTS elections (
	"id"	INTEGER,
	"guild_id" INTEGER,
	"name"	TEXT,
	"candidate1"	TEXT,
	"fraud_percentage"	INTEGER DEFAULT 0,
	"fraud_favorised"	TEXT,
	"end_time"	INTEGER,
	"message_id"  TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS election_participants (
	"user"          TEXT,
	"election_id"   INTEGER,
	"candidate_id"	INTEGER,
);