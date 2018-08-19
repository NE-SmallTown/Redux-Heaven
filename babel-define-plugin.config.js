console.log(11111, process.env.NODE_ENV, !!process.env.NODE_ENV)

module.exports = {
  '__DEV__': !!process.env.NODE_ENV
};
