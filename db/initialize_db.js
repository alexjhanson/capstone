/*
    Functions for setting up the DB
    with some initial records taken
    from the original dataset.

    3 records from original dataset were
    selected at random and reomved from
    dataset. They are populated in the DB
    to test API routes and test model
    with known values.
*/

const { db  } = require('./db');
const sql = require('./sql_commands');


// sql.drop_table();

// sql.create_table();

// values = '1,42,December,1,3,2,0,Online TA,TA_TO,0,No Deposit,0,Transient,0,FALSE,2020,15'.split(',');

// sql.insert(values);

// values = '1,36,December,2,0,2,0,Online TA,TA_TO,0,No Deposit,0,Transient,1,FALSE,2021,3'.split(',');

// sql.insert(values);

// values = '0,24,December,2,3,2,0,Corporate,Corporate,0,No Deposit,0,Transient_Party,0,FALSE,2019,21'.split(',');

// sql.insert(values);

// db.run('UPDATE reservations SET is_processed = TRUE', [], (err) => {
//     if(err) return console.log(err.message);
// } );

// sql.select_all().then((data) => console.log(data));











    