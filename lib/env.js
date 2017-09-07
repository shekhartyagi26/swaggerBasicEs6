const isTestRun = () => {
  return process.env.NODE_ENV === 'test'
};
const isAppRun = () => {
  return !isTestRun()
};
const isLocal = () => {
  return process.env.VCAP_APP_PORT === undefined
};
const isOnline = () => {
  return !isLocal()
};

module.exports = {
  isAppRun,
  isTestRun,
  isOnline,
  isLocal,
};