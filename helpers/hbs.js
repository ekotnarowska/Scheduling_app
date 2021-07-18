const { days } = require('../data')

const toDay = (number) => {
    for (let i = 1; i <= days.length; i++) {
        switch (number) {
            case i:
                return days[i]
                break;
        }
    }
}

module.exports = {
    counter: (index) => index + 1,
    showDays: (day) => toDay(parseInt(day))
}


