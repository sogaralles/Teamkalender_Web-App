const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./events.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS quote (
        ID INTEGER PRIMARY KEY,
        date TEXT,
        teamEvent BOOLEAN,
        matter TEXT
    )
`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully');
    }
});