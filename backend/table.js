const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./events.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        ID INTEGER PRIMARY KEY,
        date TEXT,
        teamEvent BOOLEAN,
        startTime TEXT,
        endTime TEXT,
        priority INTEGER,
        matter TEXT,
        comment TEXT,
        owner TEXT
    )
`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully');
    }
});