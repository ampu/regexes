const onNoop = () => {
};

const sleep = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

module.exports = {
  onNoop,
  sleep,
};
