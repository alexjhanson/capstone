const sql = require('../db/sql_commands');


function calculateLeadTime(checkIn) {
   
    let currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),0,0,0,0);

    let leadTime = 0;

    while(currentDate < checkIn) {
        currentDate.setDate(currentDate.getDate() + 1);
        leadTime++;
    }

    return leadTime
}

function caculateNumWeekNightsAndWeekendNights(checkIn, checkOut) {

    // create copy to modify
    checkIn = new Date(checkIn)

    let weekNights = 0;
    let weekendNights = 0;
    let day;

    while(checkIn < checkOut) {

        day = checkIn.getDay();

        if(day == 0 || day == 5 || day == 6) {
            weekendNights++;
        }else {
            weekNights++;
        }

        checkIn.setDate(checkIn.getDate() + 1);
    }

    return [weekNights, weekendNights];
}


function create_reservation(req, res) {

    let checkIn = req.body.checkIn.split('-');
    checkIn = new Date(parseInt(checkIn[0]), parseInt(checkIn[1]) - 1, parseInt(checkIn[2]),0,0,0,0);


    let checkOut = req.body.checkOut.split('-');
    checkOut = new Date(parseInt(checkOut[0]), parseInt(checkOut[1]) - 1, parseInt(checkOut[2],0,0,0,0));

    let [weekNights, weekendNights] = caculateNumWeekNightsAndWeekendNights(checkIn, checkOut);

    sql.insert([0, // is canceled (0: no 1: yes)
                calculateLeadTime(checkIn),// calculate lead time from date obj
                checkIn.toLocaleString('default', { month: 'long' }), // month
                weekendNights,// stays in weekend nights
                weekNights,// stays in week nights
                req.body.adults,
                req.body.children,
                'Direct',
                'Direct',
                Math.floor(Math.random() * 10), // booking changes
                'No Deposit', // deposit type
                0, // days in waiting list
                'Transient', // customer type
                Math.floor(Math.random() * 5), // number of special requests
                0, // is processed (0:no 1:yes)
                checkIn.getFullYear(), // year
                checkIn.getDate(), // day of month
            ])
    .then(status => res.status(status).end())
    .catch(err => res.status(500).json(JSON.stringify(err)));
}

async function getProcessed(req, res) {
    const data = await sql.select_all_where('is_processed = ?', [1])
    res.status(200).json(data);
}

async function getUnprocessed(req, res) {
    const data = await sql.select_all_where('is_processed = ?', [0])
    res.status(200).json(data);
}

module.exports = {
    new: create_reservation,
    getProcessed,
    getUnprocessed
};