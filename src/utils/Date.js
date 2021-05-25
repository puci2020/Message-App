export const dateToString = (timestamp) => {
    const date = timestamp?.toDate();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day < 10) day = `0${day}`;
    if (month + 1 < 10) month = `0${month}`;

    return `${day}:${month}:${date.getFullYear()}`;
};

export const timeToString = (timestamp) => {
    const time = timestamp?.toDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();

    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;

    return `${hour}:${minutes}`;
};

export const compareDates = (DBtimestamp, sysDate) => {
    const date1 = DBtimestamp.toDate();
    const date2 = sysDate;
    const diff = date2.getTime() - date1.getTime();
    // console.log(dateToString(date1));
    // console.log(dateToString(date2));
    console.log(diff / (1000 * 3600 * 24));
    // console.log(date2.getTime());
};

export const getDay = (timestamp) => {
    const date = timestamp?.toDate();
    return date.getDay();
};
