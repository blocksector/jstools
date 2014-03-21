// extend date object and define the format method
Date.prototype.toRelativeTime = function () {
    
    // the dates
    var from_date = this,
        current_date = new Date();

    // Compute for difference
    var time_diff = current_date.getTime() - from_date.getTime();

    // convert to sec, min, hr, or day
    var sec = Math.floor(time_diff/1000),
        min = Math.floor(sec/60),
        hr = Math.floor(min/60),
        day = Math.floor(hr/24);

    // check which string to use
    switch( (day>=1)?"day":(hr>=1)?"hr":(min>=1)?"min":(sec>=0)?"sec":null ) {

        case "day":
            return (day<=7)?day+" day"+((day>=2)?"s":"") + " ago":this.toDateString();
            
        case "hr":
            return hr + " hour" + ((hr>=2)?"s":"") + " ago";

        case "min":
            return min + " minute" + ((min>=2)?"s":"") + " ago";

        case "sec":
            return (sec>=6)?sec+" seconds ago":"just now";

        default:
            return "Date is out of range";

    };

};