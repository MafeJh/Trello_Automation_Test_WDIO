import chai from 'chai';

declare global {
  var expect: typeof chai.expect;
  var assert: typeof chai.assert;
}