function formatTime(n) {
  if (n < 10) return "0" + n;
  return n;
}

function formatDate(n) {
  if (n % 10 === 1) return n + "st";
  if (n % 10 === 2) return n + "nd";
  if (n % 10 === 3) return n + "rd";
  return n + "th";
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function currentTime(fn) {
  const _date = new Date();
  const hr = formatTime(_date.getHours());
  const min = formatTime(_date.getMinutes());
  const seconds = formatTime(_date.getSeconds());
  const day = days[_date.getDay()];
  const date = formatDate(_date.getDate());

  fn({ hr, min, date, day });

  setTimeout(() => {
    currentTime(fn);
  }, (60 - seconds) * 1000);
}
