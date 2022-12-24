const fs = require('fs');
const { db  } = require('./db');

columns_data = fs.readFileSync('./db/sql_columns.csv');

columns_data = columns_data.toString().split('\n');

const names = columns_data[0].split(',');
const types = columns_data[1].split(',');

names[names.length-1] = names[names.length-1].replace(/[\n\r]/g, '');
types[types.length-1] = types[types.length-1].replace(/[\n\r]/g, '');

let sql;

// build SQL CREATE TABLE command

sql = [];

sql.push("CREATE TABLE IF NOT EXISTS reservations(res_id INTEGER PRIMARY KEY AUTOINCREMENT");

for(let i = 0; i < names.length; i++) {
    sql.push(names[i] + " " + types[i]);
}

sql.push('is_processed boolean');
sql.push('year int');
sql.push('day_of_month int');

const CREATE_TABLE = sql.join(', ') + ")";

const create_table = () => {
    db.run(CREATE_TABLE, [], (err) => {
            if(err) return console.log(err.message);
        } )
}

// SQL DROP TABLE command

const drop_table = () => {
    db.run("DROP TABLE IF EXISTS reservations", [], (err) => {
            if(err) return console.log(err.message);
        } )
}

// build SQL INSERT command

sql = "INSERT INTO reservations(";

for(let i = 0; i < names.length; i++){
    sql += names[i] + ", ";
}

sql += `is_processed, year, day_of_month) VALUES(`;

for(let i = 0; i < names.length; i++){
    sql += "?,";
}

const INSERT = sql + "?,?,?)";

const insert = (values) => {
    return new Promise((resolve, reject) => {
        db.run(INSERT, values, (err) => {
            if(err) reject(err);
            else resolve(200)
        } )
    })
    
}

// SQL SELECT * 

const select_all = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM reservations", [], (err, rows) => {
            if(err)
                reject(err);
            resolve(rows);
        } )
    });
}

// SQL SELECT * WHERE id = ?

const select_all_where =  (where, values) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM reservations WHERE " + where, values, (err, rows) => {
            if(err)
                reject(err);
            resolve(rows);
        } )
    });
}

/* EXPORT SQL COMMANDS */

module.exports = {
    create_table,
    drop_table,
    insert,
    select_all,
    select_all_where  
};