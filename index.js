const ipMatchFilter = require('./lib/ip-match');
const domainMatchFilter = require('./lib/domain-match');
const ipRangeFilter = require('./lib/ip-range-match');

const checklist = {
  ip: ipMatchFilter,
  domain: domainMatchFilter,
  ipRange: ipRangeFilter
};

module.exports = {
  filter(input, rules) {
    for (let i = 0; i < rules.length; i++) {
      if ((checklist[rules[i].category]).call(this, input, rules[i].allowed) !== false) {
        return true;
      }
    }
    return false;
  }
};