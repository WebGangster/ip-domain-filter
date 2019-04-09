const isMatch = require('is-match');
const toPath = require('to-file-path');

const tofilePath = (value) => {
    value = (typeof value === 'string') ? toPath(value) : value;
    value = Array.isArray(value) ? value.map(p => toPath(p)) : value;
    return value;
}

const domainMatchFilter= (ip, patterns) => {
    const id = tofilePath(ip);
    patterns = tofilePath(patterns);

    return isMatch(patterns)(id) ? true : false
};

module.exports = domainMatchFilter;