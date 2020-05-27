const EmailRegExp = new RegExp(
  /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const PasswordRegExp = new RegExp(/^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z!?,.\-_]{6,}$/);

const WorkspaceRegExp = new RegExp(/^[A-Za-z0-9\s]{3,21}$/);

export { EmailRegExp, PasswordRegExp, WorkspaceRegExp };
