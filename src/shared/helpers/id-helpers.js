const {nanoid} = require(`nanoid`);

const {formatTimestamp} = require(`./date-helpers`);

const generateId = ({isSafe = true}) => {
  return isSafe
    ? nanoid()
    : formatTimestamp(new Date());
};

export {
  generateId,
};
