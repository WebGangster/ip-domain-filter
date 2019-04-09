let expect = require('chai').expect;
let hostFilter = require('../index');

var rules = [{
    category: 'ip',
    allowed: ['127.0.0.2', '127.0.0.4', '127.0.0.6']
  },
  {
    category: 'domain',
    allowed: ['localhost', 'google.com']
  },
  {
    category: 'ipRange',
    allowed: ['127.1.0.8', '127.1.0.20']
  },
  {
    category: 'ip',
    allowed: ['192.168.??.1']
  },
  {
    category: 'ip',
    allowed: ['192.168.1.*']
  },  
];

describe('Running IP/DOMAIN Tests', function () {
  it('IP Test - In *', function (done) {
    var ip = '192.168.1.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(true);
    done();
  });
  it('IP Test - Not In *', function (done) {
    var ip = '192.168.2.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

  it('IP Test - In ??', function (done) {
    var ip = '192.168.10.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(true);
    done();
  });

  it('IP Test - Not In ???', function (done) {
    var ip = '192.168.100.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

  it('IP Test - Not In ??', function (done) {
    var ip = '192.168.5.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

  it('IP Test - In', function (done) {
    var ip = '127.0.0.2';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(true);
    done();
  });

  it('IP Test - Not In', function (done) {

    var ip = '127.0.0.1';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

  it('Domain Test - In', function (done) {

    var ip = 'localhost';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(true);
    done();
  });

  it('Domain Test - Not In', function (done) {

    var ip = 'npmjs.com';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

  it('IP Range Test - In', function (done) {

    var ip = '127.1.0.10';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(true);
    done();
  });

  it('IP Range Test - Not In', function (done) {

    var ip = '127.1.0.30';
    var result = hostFilter.filter(ip, rules);

    expect(result).to.equal(false);
    done();
  });

});