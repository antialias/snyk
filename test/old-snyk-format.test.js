var protect = require('../lib/protect');
var test = require('tape');

test('test sensibly bails if gets an old .snyk format', function (t) {
  var vulns2 = require('./fixtures/test-jsbin-vulns-updated.json');
  var policy = require('../lib/policy');

  t.plan(1);
  policy.load(__dirname + '/fixtures/old-snyk-config').then(function (config) {
    return protect.filterIgnored(config.ignore, vulns2.vulnerabilities);
  }).then(function (res) {
    t.fail('was expecting an error, got ' + JSON.stringify(res));
  }).catch(function (e) {
    t.equal(e.code, 'OLD_DOTFILE_FORMAT');
  });
});