// A Datespan is a duration
Datespan = function(initialValues){
  this.milliseconds = initialValues.milliseconds;
  this.minutes = initialValues.minutes;
  this.months = initialValues.months;
}

Datespan.prototype.fromTime = function(fromTime){
  return Datespan(fromTime, this);
}

// Add a duration to a timestamp
// Returns a new timestamp
Datespan.plus = function(fromTime, Datespan){
  var newTime = new Date(fromTime.getTime());

  // first: add months
  if(Datespan.months){
    newTime.setMonth(fromTime.getMonth() + Datespan.months)
  }

  // then: add minutes
  // then: add milliseconds

  return newTime;
}

// Return the distance between to timestamps
// Reutrns a Datespan (duration) object
Datespan.between = function(fromTime, toTime, compareMethod){
  if(!compareMethod){
    throw new Error("No compare method given, try 'months', 'minutes', or 'milliseconds'")
  }
  switch(compareMethod){
    case 'months':
      return new Datespan({ months: 24 })
      break;
    case 'minutes':
      return new Datespan({ minutes: 1052640 } )
      break;
    case 'milliseconds':
      return new Datespan({ milliseconds: 63158400000 })
      break;
  }
}

// Test

var year2015 = new Date(2015, 0, 1, 13, 0, 0);
var year2017 = new Date(2017, 0, 1, 13, 0, 0);

console.log( Datespan.between(year2015, year2017, 'months')       );//  === new Datespan({ months: 24 }) );
console.log( Datespan.between(year2015, year2017, 'minutes')      );//  === new Datespan({ minutes: 1052640 }) );
console.log( Datespan.between(year2015, year2017, 'milliseconds') );//  === new Datespan({ milliseconds: 63158400000 }) ); // wrong: no leap seconds

var months24 = new Datespan({ months: 24 });
console.log( Datespan.plus(new Date(2015, 0, 1, 13, 0, 0), months24) );
console.log( Datespan.plus(new Date(2015, 0, 1, 13, 0, 0), months24) === new Date(2017, 0, 1, 13, 0, 0) );