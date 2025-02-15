import connection from "../config/connectDB";
import winGoController from "./winGoController";
import k5Controller from "./k5Controller";
import k3Controller from "./k3Controller";
import cron from 'node-cron';
const axios = require('axios');
const moment = require('moment');


const cronJobGame1p = (io) => {
    const crypto = require('crypto');

    let number = 64869934;
let data = [];

function generateRandomHash() {
    return crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('hex');
}

function updateNumberAndHash() {
    number++;
    const hash = generateRandomHash();
    data.unshift({ number, hash });
    // console.log("data is ...",data)
    // Keep only the latest 1000 entries
    if (data.length > 1000) {
        data.pop();
    }
    io.emit('numberAndHashData', { data });
}

cron.schedule('*/3 * * * * *', () => {
    updateNumberAndHash();
});

     cron.schedule('*/1 * * * *', async() => {
         await winGoController.addWinGo(1);
         await winGoController.handlingWinGo1P(1);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(1);
         await k5Controller.handling5D(1);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '1' });

         await k3Controller.addK3(1);
         await k3Controller.handlingK3(1);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '1' });
     });
     cron.schedule('*/3 * * * *', async() => {
         await winGoController.addWinGo(3);
         await winGoController.handlingWinGo1P(3);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo3" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(3);
         await k5Controller.handling5D(3);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '3' });

         await k3Controller.addK3(3);
         await k3Controller.handlingK3(3);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '3' });
     });
     cron.schedule('*/5 * * * *', async() => {
         await winGoController.addWinGo(5);
         await winGoController.handlingWinGo1P(5);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo5" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

         await k5Controller.add5D(5);
         await k5Controller.handling5D(5);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '5' });

         await k3Controller.addK3(5);
         await k3Controller.handlingK3(5);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '5' });
     });
     cron.schedule('*/10 * * * *', async() => {
         await winGoController.addWinGo(10);
         await winGoController.handlingWinGo1P(10);
         const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo10" ORDER BY `id` DESC LIMIT 2 ', []);
         const data = winGo1; // New bridge has no results
         io.emit('data-server', { data: data });

        
         await k5Controller.add5D(10);
         await k5Controller.handling5D(10);
         const [k5D] = await connection.execute('SELECT * FROM 5d WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ', []);
         const data2 = k5D; // New bridge has no results
         io.emit('data-server-5d', { data: data2, 'game': '10' });

         await k3Controller.addK3(10);
         await k3Controller.handlingK3(10);
         const [k3] = await connection.execute('SELECT * FROM k3 WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ', []);
         const data3 = k3; // New bridge has no results
         io.emit('data-server-k3', { data: data3, 'game': '10' });
     });

    // trx wingo
function generateUniqueID() {
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date = new Date(now);
    const year = date.getFullYear().toString();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    // Get the hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalMinutes = (hours * 60) + minutes+1;
    const timePeriod = ('00000' + totalMinutes).slice(-5);
    const uniqueID = `${year}${month}${day}${timePeriod}`;

    return uniqueID;
}
const id = generateUniqueID();
console.log("Generated ID:", id);

    cron.schedule('*/1 * * * *', async () => {
        try {
            await winGoController.trxhandlingWinGo1P(1);
          
//  const response = await axios.get(`https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=`, {
// });
// const data = response.data.data;
const response1 = data.slice(0, 20); // Get the latest 20 entries
            console.log("Using number data:", response1[0].number);
            console.log("Using hash data:", response1[0].hash);
const currentBlockNumber = data[0].number;
        const targetBlockIndex = 2;
        const targetBlockData = data[targetBlockIndex];
        const block = response1[0].number;
        const hash = response1[0].hash;
        const lastFiveChars = hash.slice(-5);
        io.emit('data-server-hash', { data: lastFiveChars});
function findLastIntegerDigit(hash) {
    for (let i = hash.length - 1; i >= 0; i--) {
        if (!isNaN(hash[i]) && hash[i] !== ' ') {
            return hash[i];
        }
    }
    return null;
}
const  result= findLastIntegerDigit(hash);
 const currentTime = new Date();
 const adjustedTime = new Date(currentTime.getTime() - 3000);
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
};
const time = new Intl.DateTimeFormat('en-GB', options).format(adjustedTime).replace(',', '');
const formattedTime = time.replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
            const bigsmall = result <= 4 ? 'small' : 'big';
            const status = 0;
            const singleType = 1;
            const uniqueID = generateUniqueID();
            const query = 'INSERT INTO trx (period, block, hash, result, bigsmall, time, status,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [uniqueID, block, hash, result, bigsmall, formattedTime, status, singleType]; // Assuming period can be null or auto-increment
            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted:', results.insertId);
            });
        } catch (error) {
            console.error('Error fetching data from API:');
        }
    })
    cron.schedule('*/3 * * * *', async () => {
        try {
            await winGoController.trxhandlingWinGo1P(3);
            const [periodDatafromDatabase] = await connection.execute('SELECT period FROM trx WHERE type = 2 ORDER BY id DESC LIMIT 1', []);
            let period = periodDatafromDatabase[0].period;
                const newPeriod = Number(period) + 1;
                console.log("Updated period value:", newPeriod);
          
//  const response = await axios.get(`https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=`, {
// });
// const data = response.data.data;
const response1 = data.slice(0, 20); // Get the latest 20 entries
            console.log("Using number data:  3 ....", response1[0].number);
            console.log("Using hash data: 3 .....", response1[0].hash);
const currentBlockNumber = data[0].number;
        const targetBlockIndex = 1; // 3 seconds back (assuming each block represents ~1 second)
        const targetBlockData = data[targetBlockIndex];
        const block = response1[0].number;
        const hash = response1[0].hash;
        const lastFiveChars = hash.slice(-5);
        io.emit('data-server-hash-three', { data: lastFiveChars});
function findLastIntegerDigit(hash) {
    for (let i = hash.length - 1; i >= 0; i--) {
        if (!isNaN(hash[i]) && hash[i] !== ' ') {
            return hash[i];
        }
    }
    return null;
}
const  result= findLastIntegerDigit(hash);
 const currentTime = new Date();
 const adjustedTime = new Date(currentTime.getTime() - 3000);
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
};
const time = new Intl.DateTimeFormat('en-GB', options).format(adjustedTime).replace(',', '');
const formattedTime = time.replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
            const bigsmall = result <= 4 ? 'small' : 'big';
            const status = 0;
            const singleType = 2;
            const uniqueID = generateUniqueID();
            io.emit('data-server-periodid-threeminute', { data: uniqueID});
            const query = 'INSERT INTO trx (period, block, hash, result, bigsmall, time, status,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [newPeriod, block, hash, result, bigsmall, formattedTime, status, singleType]; // Assuming period can be null or auto-increment
            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted:', results.insertId);
            });
        } catch (error) {
            console.error('Error fetching data from API:');
        }
    })
    cron.schedule('*/5 * * * *', async () => {
        try {
            await winGoController.trxhandlingWinGo1P(5);
            const [periodDatafromDatabasefive] = await connection.execute('SELECT period FROM trx WHERE type = 2 ORDER BY id DESC LIMIT 1', []);
            let periodfive = periodDatafromDatabasefive[0].period;
                // Convert the period to a number and add 1
                const newPeriodfive = Number(periodfive) + 1;
                console.log("Updated period value:", newPeriodfive);
//  const response = await axios.get(`https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=`, {
// });
// const data = response.data.data;
const response1 = data.slice(0, 20); // Get the latest 20 entries
            console.log("Using number data:  5 ....", response1[0].number);
            console.log("Using hash data: 5 .....", response1[0].hash);
const currentBlockNumber = data[0].number;
        const targetBlockIndex = 1; // 3 seconds back (assuming each block represents ~1 second)

        const targetBlockData = data[targetBlockIndex];
        // const block = targetBlockData.number;
        // const hash = targetBlockData.hash;
        const block = response1[0].number;
        const hash = response1[0].hash;
        const lastFiveChars = hash.slice(-5);
        io.emit('data-server-hash-five', { data: lastFiveChars});
function findLastIntegerDigit(hash) {
    for (let i = hash.length - 1; i >= 0; i--) {
        if (!isNaN(hash[i]) && hash[i] !== ' ') {
            return hash[i];
        }
    }
    return null;
}
const  result= findLastIntegerDigit(hash);
 const currentTime = new Date();
 const adjustedTime = new Date(currentTime.getTime() - 3000);
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
};
const time = new Intl.DateTimeFormat('en-GB', options).format(adjustedTime).replace(',', '');
const formattedTime = time.replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
            const bigsmall = result <= 4 ? 'small' : 'big';
            const status = 0;
            const singleType = 3;
            const uniqueID = generateUniqueID();
            const query = 'INSERT INTO trx (period, block, hash, result, bigsmall, time, status,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [newPeriodfive, block, hash, result, bigsmall, formattedTime, status, singleType]; // Assuming period can be null or auto-increment
            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted:', results.insertId);
            });
        } catch (error) {
            console.error('Error fetching data from API:');
        }
    })
    cron.schedule('*/10 * * * *', async () => {
        try {
            await winGoController.trxhandlingWinGo1P(10);
            const [periodDatafromDatabaseten] = await connection.execute('SELECT period FROM trx WHERE type = 4 ORDER BY id DESC LIMIT 1', []);
            let periodten = periodDatafromDatabaseten[0].period;
                const newPeriodten = Number(periodten) + 1;
                console.log("Updated period value:", newPeriodten);
          
//  const response = await axios.get(`https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=`, {
// });
// const data = response.data.data;
const response1 = data.slice(0, 20); // Get the latest 20 entries
            console.log("Using number data:  10 ....", response1[0].number);
            console.log("Using hash data: 10 .....", response1[0].hash);
const currentBlockNumber = data[0].number;
        const targetBlockIndex = 1; // 3 seconds back (assuming each block represents ~1 second)

        const targetBlockData = data[targetBlockIndex];
        // const block = targetBlockData.number;
        // const hash = targetBlockData.hash;
        const block = response1[0].number;
        const hash = response1[0].hash;
        const lastFiveChars = hash.slice(-5);
        io.emit('data-server-hash-ten', { data: lastFiveChars});
function findLastIntegerDigit(hash) {
    for (let i = hash.length - 1; i >= 0; i--) {
        if (!isNaN(hash[i]) && hash[i] !== ' ') {
            return hash[i];
        }
    }
    return null;
}
const  result= findLastIntegerDigit(hash);
 const currentTime = new Date();
 const adjustedTime = new Date(currentTime.getTime() - 3000);
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
};
const time = new Intl.DateTimeFormat('en-GB', options).format(adjustedTime).replace(',', '');
const formattedTime = time.replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6');
            const bigsmall = result <= 4 ? 'small' : 'big';
            const status = 0;
            const singleType = 4;
            const uniqueID = generateUniqueID();
            const query = 'INSERT INTO trx (period, block, hash, result, bigsmall, time, status,type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [newPeriodten, block, hash, result, bigsmall, formattedTime, status, singleType]; // Assuming period can be null or auto-increment
            connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return;
                }
                console.log('Data inserted:', results.insertId);
            });
        } catch (error) {
            console.error('Error fetching data from API:');
        }
    })
    // display data 
    cron.schedule('*/5 * * * * *',async()=>{
        const [singletrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 10 OFFSET 1', []);
        const singletrxdatachart = singletrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-chart', { data: singletrxdatachart });
        const [threetrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 2 ORDER BY id DESC LIMIT 10', []);
        const threetrxdatachart = threetrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-three-chart', { data: threetrxdatachart });
        const [fivetrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 3 ORDER BY id DESC LIMIT 10', []);
        const fivetrxdatachart = fivetrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-five-chart', { data: fivetrxdatachart });
        const [tentrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 4 ORDER BY id DESC LIMIT 10', []);
        const tentrxdatachart = tentrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-ten-chart', { data: tentrxdatachart });
    })
    cron.schedule('*/4 * * * * *', async () => {
        
        const [singletrxgetData] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 10 OFFSET 1', []);
        const singletrxdata = singletrxgetData.map(items => {
            items.hash = items.hash.slice(-4);
            items.time = items.time.split(' ')[1];
          
            // Format period field as per your requirement
            const formattedPeriod = `202**${items.period.toString().slice(-4)}`;
            items.period = formattedPeriod;
          
            // Return the modified item
            return items;
          });
        //   console.log("data is ....",singletrxdata)
        io.emit('data-server-trx', { data: singletrxdata });
        const [threetrxgetData] = await connection.execute('SELECT * FROM trx WHERE type = 2 ORDER BY id DESC LIMIT 10', []);
        const threetrxdata = threetrxgetData.map(items => {
            // Update hash to show only the last 6 characters
            items.hash = items.hash.slice(-4);
          
            // Update time to show only the time part (HH:mm:ss)
            items.time = items.time.split(' ')[1];
          
            // Format period field as per your requirement
            const formattedPeriod = `202**${items.period.toString().slice(-4)}`;
            items.period = formattedPeriod;
          
            // Return the modified item
            return items;
          });
        io.emit('data-server-trx-three', { data: threetrxdata });
        
        const [fivetrxgetData] = await connection.execute('SELECT * FROM trx WHERE type = 3 ORDER BY id DESC LIMIT 10', []);
        const fivetrxdata = fivetrxgetData.map(items => {
            // Update hash to show only the last 6 characters
            items.hash = items.hash.slice(-4);
          
            // Update time to show only the time part (HH:mm:ss)
            items.time = items.time.split(' ')[1];
          
            // Format period field as per your requirement
            const formattedPeriod = `202**${items.period.toString().slice(-4)}`;
            items.period = formattedPeriod;
          
            // Return the modified item
            return items;
          });
        io.emit('data-server-trx-five', { data: fivetrxdata });
        
        const [tentrxgetData] = await connection.execute('SELECT * FROM trx WHERE type = 4 ORDER BY id DESC LIMIT 10', []);
        const tentrxdata = tentrxgetData.map(items => {
            // Update hash to show only the last 6 characters
            items.hash = items.hash.slice(-4);
          
            // Update time to show only the time part (HH:mm:ss)
            items.time = items.time.split(' ')[1];
          
            // Format period field as per your requirement
            const formattedPeriod = `202**${items.period.toString().slice(-4)}`;
            items.period = formattedPeriod;
          
            // Return the modified item
            return items;
          });
        io.emit('data-server-trx-ten', { data: tentrxdata });
        
        // >>>>>>>>>>>>>>>>>>>> in every 3 secound display as 3 minute data >>>>>>>
    })
    cron.schedule('*/1 * * * * *', async () => {
        const [singletrxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC LIMIT 1 OFFSET 1', []);
            const singletrxPeriodData=singletrxgetperiod[0].period +1;
            const lastFiveChars = singletrxgetperiod[0].hash.slice(-5);
            io.emit('data-server-hash', { data: lastFiveChars});
            io.emit('data-server-trx-get-period', { data: singletrxPeriodData });
            const [threetrxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 2 ORDER BY id DESC LIMIT 1', []);
            const threetrxPeriodData=threetrxgetperiod[0].period +1;
            const lastFiveCharsthree = threetrxgetperiod[0].hash.slice(-5);
            io.emit('data-server-hash-three', { data: lastFiveCharsthree});
            io.emit('data-server-trx-get-period-three', { data: threetrxPeriodData });
            const [fivetrxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 3 ORDER BY id DESC LIMIT 1', []);
            const fivetrxPeriodData=fivetrxgetperiod[0].period +1;
            const lastFiveCharstfive = fivetrxgetperiod[0].hash.slice(-5);
            io.emit('data-server-hash-five', { data: lastFiveCharstfive});
            io.emit('data-server-trx-get-period-five', { data: fivetrxPeriodData });
            const [tentrxgetperiod] = await connection.execute('SELECT * FROM trx WHERE type = 4 ORDER BY id DESC LIMIT 1', []);
            const tentrxPeriodData=tentrxgetperiod[0].period +1;
            const lastFiveCharstten = tentrxgetperiod[0].hash.slice(-5);
            io.emit('data-server-hash-ten', { data: lastFiveCharstten});
            io.emit('data-server-trx-get-period-ten', { data: tentrxPeriodData });
        // >>>>>>>>>>>>>>>>>>>> in every 3 secound display as 3 minute data >>>>>>>
    })
    // admin display data
    cron.schedule('*/1 * * * *', async () => {
        const avgMissingRandom = getRandomValues(avgMissingValues);
    const frequencyRandom = getRandomValues(frequencyValues);
    io.emit('updateValues', { avgMissing: avgMissingRandom, frequency: frequencyRandom });
        try {
            console.log("enter con job for q....")
            const getLatestBlock = async () => {
                try {
                    const [rows] = await connection.query('SELECT * FROM trx WHERE type=1 ORDER BY id DESC LIMIT 1');
                    if (rows.length > 0) {
                        return rows[0];
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching latest block:', error);
                    return null;
                }
            };
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            const performIncrementalOperation = async () => {
                const latestBlock = await getLatestBlock();
                if (!latestBlock) {
                    console.error('No block data found');
                    return;
                }
                let currentBlock = latestBlock.block;
                let currentTimeString = latestBlock.time;
                let [datePart, timePart] = currentTimeString.split(' '); // Split date and time parts
                let [day, month, year] = datePart.split('/').map(Number); // Split and parse date parts
                let [hours, minutes, seconds] = timePart.split(':').map(Number); // Split and parse time parts
                const secondIncrement = Math.floor(seconds / 3); // Increment value based on the given logic
                let iterationCount = 0;
                const totalIterations = 20;
                const resultsHistory = []; 
                const intervalId = setInterval(async () => {
                    iterationCount++;
                    currentBlock += 1;
                    seconds += secondIncrement;
                    if (seconds >= 60) {
                        minutes += Math.floor(seconds / 60);
                        seconds = seconds % 60;
                    }
                    if (minutes >= 60) {
                        hours += Math.floor(minutes / 60);
                        minutes = minutes % 60;
                    }
                    if (hours >= 24) {
                        hours = hours % 24;
                    }
                    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Format time as HH:mm:ss
                    try {
                        // const response = await axios.get('https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=&end_timestamp=', {
                        // });
                        // const data = response.data.data[0];
                        const response1 = data.slice(0, 20); // Get the latest 20 entries
            // console.log("Using number data:  admin ....", response1[0].number);
            // console.log("Using hash data: admin  .....", response1[0].hash);
                        // const block = data.number;
                        // const hash = data.hash;
                        const block = response1[0].number;
                        const hash = response1[0].hash;
                        function findLastIntegerDigit(hash) {
                            for (let i = hash.length - 1; i >= 0; i--) {
                                if (!isNaN(hash[i]) && hash[i] !== ' ') {
                                    return hash[i];
                                }
                            }
                            return null;
                        }
                        const  results= findLastIntegerDigit(hash);
                        // console.log("result is ...",results)
                        const bigsmall = results <= 4 ? 'small' : 'big';
                        let blockData = {
                            block: block,
                            time: formattedTime,
                            result: results,
                            bigsmall: bigsmall
                        };
                        resultsHistory.push(blockData);
                        if (resultsHistory.length > 10) {
                            resultsHistory.shift();
                        }
                        io.emit('data-server-trx-three-secound', { data: resultsHistory });
                    } catch (error) {
                        console.error('Error fetching block result:.....');
                    }
                    if (iterationCount >= totalIterations) {
                        clearInterval(intervalId); // Clear the interval after 20 iterations
                        console.log('Completed 20 intervals, waiting for 60 seconds before fetching new data...');
                        await delay(2000); 
                    }
                }, 3000);
            };
            performIncrementalOperation();
        } catch (error) {
            console.error('Error fetching data from API:');
        }
    })

// chart randar data display 
const avgMissingValues = [9, 8, 6, 11, 13, 6, 7, 9, 8, 2];
const frequencyValues = [9, 13, 14, 8, 8, 9, 14, 9, 7, 9];
function getRandomValues(values) {
    return values.map(() => values[Math.floor(Math.random() * values.length)]);
}

// Cron job to emit updated values every minute
cron.schedule('*/7 * * * * *', async() => {
    const [alltrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 1 ORDER BY id DESC OFFSET 1', []);
        const alltrxdatachart = alltrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-chartall', { data: alltrxdatachart });
        const [allthreetrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 2 ORDER BY id DESC', []);
        const allthreetrxdatachart = allthreetrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-three-chartall', { data: allthreetrxdatachart });
        const [alltfivetrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 3 ORDER BY id DESC', []);
        const alltfivetrxdatachart = alltfivetrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-five-chartall', { data: alltfivetrxdatachart });
        const [alltentrxgetDatachart] = await connection.execute('SELECT * FROM trx WHERE type = 4 ORDER BY id DESC', []);
        const alltentrxdatachart = alltentrxgetDatachart.map(items => {
            return items;
          });
        io.emit('data-server-trx-ten-chartall', { data: alltentrxdatachart });
});

    // close
     cron.schedule('* * 0 * * *', async() => {
         await connection.execute('UPDATE users SET roses_today = ?', [0]);
         await connection.execute('UPDATE point_list SET money = ?', [0]);
     });
}

module.exports = {
     cronJobGame1p
};