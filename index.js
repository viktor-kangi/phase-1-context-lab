/* Your Code Here */

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let testEmployee =createEmployeeRecord(["Gray", "Worm", "Security", 1]);
console.log(testEmployee.firstName);
console.log(testEmployee.familyName);
console.log(testEmployee.title);
console.log(testEmployee.payPerHour);
console.log(testEmployee.timeInEvents);
console.log(testEmployee.timeOutEvents);


let createEmployeeRecords = function(rowData) {
    return rowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateBook){
    let [date, hour] = dateBook.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateBook){
    let [date, hour] = dateBook.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(workedDate){
    let inEv = this.timeInEvents.find(function(event){
        return event.date === workedDate
    })

    let outEv = this.timeOutEvents.find(function(event){
        return event.date === workedDate
    })

    return (outEv.hour - inEv.hour) / 100
    
}


let wagesEarnedOnDate = function(specificDate){
    let rawWage = hoursWorkedOnDate.call(this, specificDate)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let wagableDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = wagableDates.reduce(function (mem, s) {
        return mem + wagesEarnedOnDate.call(this, s)
    }.bind(this), 0) 

    return payable
}

let findEmployeeByFirstName = function(origArr, firstName) {
  return origArr.find(function(ind){
    return ind.firstName === firstName
  })
}

let calculatePayroll = function(empRecords){
    return empRecords.reduce(function(mem, ind){
        return mem + allWagesFor.call(ind)
    }, 0)
}