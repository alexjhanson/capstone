const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, 'reservations.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    else return console.log("connected to db")
});

module.exports = {
    db
}

