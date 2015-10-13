var development = {

};

// var config = {
//   development: development,
//   secret: 'secretForUser'
// };

// module.exports = config;

module.exports = (function() {
  return {
    development: development,
    secret: 'secretForUser',
    KEEN_API_URL: 'https://api.keen.io:443',
    KEEN_PROJECT_ID: '560e8d6e672e6c08f75f2e89',
    KEEN_READ_KEY: '1057b689a2fce3e86616de2ff057f1ecf729487b7d9a67cb89329ba02f8f28f744d94ca6ecac65289d0abce277281b6289b3d32a899f7194929b59ba302e93ba8682377abe62d3ea7e54c5b7e1afa1e6f2f5f3b9fec3c253701d87225fd971ef2d6a6e7416e9ce84835f4e4141a2866c',
    KEEN_WRITE_KEY: '04b6418895c71f9fe4aa4135cbb3c68c95cdf04a47a67044689dafb56598916af090312587c622a7a8320297f7174f109472bdf25602a03c50ad6e1939d9f9d431508bf700b007b16442f952e8f7f35d3fe771ef076e2c002067e8ac36fdd679a37ad49da7bb095ef55066e9f9bd350e'
  };
})();
