/*
 * D - full day of week
 * d - substring of day of week
 * M - full month
 * m - substring of month
 * y - year
 * H - military time format of hour
 * h - standard time format of hour
 * i - minutes
 * s - seconds
 * a - am / pm
 */


// extend date object and define the format method
Date.prototype.toFormat = function (formatStr) {

    /* 
     * create local variable of formatStr or
     * assign a default format string if formatStr
     * is empty
     */
    formatStr = formatStr || "D M J, y h:i:s a";

    var new_date = formatStr;

    // days of week long string
    var day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Month long string
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // regex patterns
    var patterns = {
        "day_of_week": /\b(d|D)\b/,
        "month": /\b(m|M)\b/,
        "day_of_month": /\b(j|J)\b/,
        "year": /\b(y)\b/,
        "hours": /\b(h|H)\b/,
        "minutes": /\b(i|I)\b/,
        "seconds": /\b(s|S)\b/,
        "ampm": /\b(a|A)\b/
    };

    // date properties
    var day = this.getDay(),
        date = this.getDate(),
        mon = this.getMonth(),
        year = this.getFullYear(),
        hr = this.getHours(),
        min = this.getMinutes(),
        sec = this.getSeconds();

    // process day of week
    if (patterns.day_of_week.test(formatStr)) {

        // replace placeholders with actual value
        switch (formatStr.match(patterns.day_of_week)[0]) {
            // 3 characters day of the week format
            case "d":
                new_date = update_format(new_date, patterns.day_of_week, day_of_week[day].substr(0, 3));
                break;

                // default format for day of the week
            default:
                new_date = update_format(new_date, patterns.day_of_week, day_of_week[day]);
        }

    } // end of day of the week

    // process month
    if (patterns.month.test(formatStr)) {

        // replace placeholders with actual value
        switch (formatStr.match(patterns.month)[0]) {
            case "m":
                new_date = update_format(new_date, patterns.month, month[mon].substr(0, 3));
                break;

            default:
                new_date = update_format(new_date, patterns.month, month[mon]);
        }

    } // end of month

    // process day of month
    if (patterns.day_of_month.test(formatStr)) {

        // replace placeholders with actual value
        switch (formatStr.match(patterns.day_of_month)[0]) {
            case "j":
                new_date = update_format(new_date, patterns.day_of_month, (date.toString().length > 1) ? date : "0" + date);
                break;

            default:
                new_date = update_format(new_date, patterns.day_of_month, date);
        }

    } // end of day of month

    // process year
    if (patterns.year.test(formatStr)) {

        new_date = update_format(new_date, patterns.year, year);

    } // end of year

    // process hour
    if (patterns.hours.test(formatStr)) {

        // replace placeholders with actual value
        switch (formatStr.match(patterns.hours)[0]) {
            case "H":
                new_date = update_format(new_date, patterns.hours, (hr.toString().length > 1) ? hr : "0" + hr);
                break;

            default:
                new_date = update_format(new_date, patterns.hours, hr % 12);
                new_date = update_format(new_date, patterns.ampm, (hr >= 12) ? "pm" : "am");
        }

    } // end of hour

    // process minutes
    if (patterns.minutes.test(formatStr)) {

        new_date = update_format(new_date, patterns.minutes, (min.toString().length > 1) ? min : "0" + min);

    } // end of minutes

    // process seconds
    if (patterns.seconds.test(formatStr)) {

        new_date = update_format(new_date, patterns.seconds, (sec.toString().length > 1) ? sec : "0" + sec);

    } // end of seconds


    return new_date;

};

function update_format(formatStr, pattern, value) {
    return formatStr.replace(pattern, value);
}