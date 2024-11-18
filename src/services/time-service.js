//Converts timestamp into the readable date
const convertRelative = (timestamp) => {

    if (!timestamp) return;
    const isoTimestamp = timestamp.replace(" ", "T");
    const unixTimestamp = Math.floor(new Date(isoTimestamp).getTime() / 1000);


    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const now = new Date();
    const diffInSeconds = Math.round((unixTimestamp * 1000 - now) / 1000);

    const intervals = [
        { unit: "year", seconds: 31536000 },
        { unit: "month", seconds: 2592000 },
        { unit: "week", seconds: 604800 },
        { unit: "day", seconds: 86400 },
        { unit: "hour", seconds: 3600 },
        { unit: "minute", seconds: 60 },
        { unit: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        if (Math.abs(diffInSeconds) >= interval.seconds) {
            const value = Math.round(diffInSeconds / interval.seconds);
            return rtf.format(value, interval.unit);
        }
    }

    return "just now"; // Fallback for very small differences
}

export default {
    convertRelative
}