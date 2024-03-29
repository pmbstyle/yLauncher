const fs = require('fs')

var fileName = ''

const createLog = async () => {

    getDateTime()

    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
    }

    fs.appendFile('./logs/log-'+fileName+'.txt', '', function (err) {
        if (err) throw err
        console.log('Log started on ' + fileName)
    })

}

const writeLog = async (msg) => {

    var stream = fs.createWriteStream('./logs/log-' + fileName + '.txt', { 'flags': 'a' })
    stream.once('open', function () {
        stream.write(msg + "\r\n")
    })

}

const getDateTime = async () => {
    
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2)

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

    let year = date_ob.getFullYear()

    let hours = date_ob.getHours()

    let minutes = ("0" + (date_ob.getMinutes())).slice(-2)

    let seconds = date_ob.getSeconds()

    fileName = year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds

}

export {
    createLog,
    writeLog
}