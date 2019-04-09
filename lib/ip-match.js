const ipRegex = require('ip-regex');
const isMatch = require('is-match');
const toPath = require('to-file-path');

const tofilePath = (value) => {
    value = (typeof value === 'string') ? toPath(value) : value;
    value = Array.isArray(value) ? value.map(p => toPath(p)) : value;
    return value;
}

const ipMatchFilter = (ip, patterns) => {
    if (typeof ip !== 'string') {
        return false;
    }

    if (!ipRegex().test(ip)) {
        return false;
    }

    const id = tofilePath(ip);
    patterns = tofilePath(patterns);

    return isMatch(patterns, {
        strict: true
    })(id) ? true : false
}

module.exports = ipMatchFilter;