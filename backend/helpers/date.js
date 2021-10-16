function formatDate(date) {
  return date.getFullYear().toString(10)
    + `-` + (date.getMonth() + 1).toString(10).padStart(2, `0`)
    + `-` + date.getDate().toString(10).padStart(2, `0`);
}

function formatTimestamp(date, withMilliseconds) {
  if (typeof (withMilliseconds) === `undefined`) {
    withMilliseconds = true;
  }
  return date.getFullYear().toString(10)
    + `-` + (date.getMonth() + 1).toString(10).padStart(2, `0`)
    + `-` + date.getDate().toString(10).padStart(2, `0`)
    + ` ` + date.getHours().toString(10).padStart(2, `0`)
    + `:` + date.getMinutes().toString(10).padStart(2, `0`)
    + `:` + date.getSeconds().toString(10).padStart(2, `0`)
    + (withMilliseconds ? (`.` + date.getMilliseconds().toString(10).padStart(3, `0`)) : ``);
}

function formatTimespan(totalMilliseconds) {
  const milliseconds = Math.floor(totalMilliseconds % 1000);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);

  return totalHours.toString().padStart(2, 0)
    + `:` + minutes.toString().padStart(2, 0)
    + `:` + seconds.toString().padStart(2, 0)
    + `.` + milliseconds.toString().padStart(3, 0);
}

module.exports = {
  formatDate,
  formatTimestamp,
  formatTimespan,
};
