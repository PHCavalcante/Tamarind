const createdAt =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1) +
  "-" +
  new Date().getDate() +
  " " +
  new Date().getHours() +
  ":" +
  new Date().getMinutes() +
  ":" +
  new Date().getSeconds();

export default createdAt;
