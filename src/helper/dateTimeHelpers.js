exports.formatDateTime = (format, date = null) => {
    const dateObj = date === null ? new Date() : new Date(date);
    const day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const month =
      dateObj.getMonth() < 9
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    let hours, minutes, seconds;
    switch (format) {
      case "iso-string":
        return dateObj.toISOString();
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "DDMMYYYY":
        return `${day}${month}${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "YYYY-MM-DD h:mm:ss":
        hours =
          dateObj.getHours < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
        minutes =
          dateObj.getMinutes < 10
            ? `0${dateObj.getMinutes()}`
            : dateObj.getMinutes();
        seconds =
          dateObj.getSeconds < 10
            ? `0${dateObj.getSeconds()}`
            : dateObj.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      case "DD/MM/YYYY h:mm:ss":
        hours =
          dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
        minutes =
          dateObj.getMinutes() < 10
            ? `0${dateObj.getMinutes()}`
            : dateObj.getMinutes();
        seconds =
          dateObj.getSeconds() < 10
            ? `0${dateObj.getSeconds()}`
            : dateObj.getSeconds();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      case "DD-MM-YYYY-h-mm-ss":
        hours =
          dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
        minutes =
          dateObj.getMinutes() < 10
            ? `0${dateObj.getMinutes()}`
            : dateObj.getMinutes();
        seconds =
          dateObj.getSeconds() < 10
            ? `0${dateObj.getSeconds()}`
            : dateObj.getSeconds();
        return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
      default:
        return dateObj.toISOString();
    }
  };

exports.getCurrentDateTimeUTCPlus6 = () => {
    const currentDate = new Date();
    const utcPlus6Offset = 6 * 60 * 60 * 1000;
    const utcPlus6Date = new Date(currentDate.getTime() + utcPlus6Offset);
    return utcPlus6Date;
  };

