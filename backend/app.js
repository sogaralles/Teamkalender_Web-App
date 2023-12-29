const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./events.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, date TEXT, teamEvent BOOLEAN, matter TEXT)');
});

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const { date, teamEvent, matter } = req.body;

    
    if (!date || !teamEvent || !matter) {
        return res.status(400).json({
            status: 'error',
            error: 'All fields are required',
        });
    }

   
    const sql = "INSERT INTO events(date, teamEvent, matter) VALUES (?,?,?)";
    db.run(sql, [date, teamEvent, matter], (err) => {
        if (err) {
            return res.status(500).json({ status: 500, success: false, error: err.message });
        }

        console.log('Successful input', date, teamEvent, matter);
        res.status(200).json({ status: 200, success: true });
    });
});

app.get('/events', (req, res) => {
    const sql = "SELECT * FROM events";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ status: 500, success: false, error: err.message });
        }

        res.status(200).json({ status: 200, success: true, data: rows });
    });
});

app.listen(3000);
