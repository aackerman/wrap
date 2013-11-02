"use strict"
var wrap = require('../index');

describe("#before", function(){
  it("should call the before function before the wrapped function", function(){
    var spy1    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1);
    fn();

    expect(spy1).to.have.been.calledOnce;
    expect(wrapped).to.have.been.calledOnce;

    expect(spy1).to.have.been.calledBefore(wrapped);
    expect(wrapped).to.have.been.calledAfter(spy1);
  });

  it("should be allowed to be wrapped several times", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1);
    var fn2     = wrap.before(fn, spy2);

    fn2();

    expect(spy1).to.have.been.calledBefore(wrapped);
    expect(spy2).to.have.been.calledBefore(spy1);
    expect(wrapped).to.have.been.calledAfter(spy1);
    expect(wrapped).to.have.been.calledAfter(spy2);
  });

  it("should accept a variable number of before callbacks", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1, spy2);
    fn();

    expect(spy1).to.have.been.calledBefore(wrapped);
    expect(spy2).to.have.been.calledAfter(spy1);
    expect(wrapped).to.have.been.calledAfter(spy1);
    expect(wrapped).to.have.been.calledAfter(spy2);
  });
});

describe('#after', function(){
  it("should call the before function before the wrapped function", function(){
    var spy1    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1);
    fn();

    expect(spy1).to.have.been.calledOnce;
    expect(wrapped).to.have.been.calledOnce;

    expect(spy1).to.have.been.calledAfter(wrapped);
    expect(wrapped).to.have.been.calledBefore(spy1);
  });

  it("should be allowed to be wrapped several times", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1);
    var fn2     = wrap.after(fn, spy2);

    fn2();

    expect(spy1).to.have.been.calledAfter(wrapped);
    expect(spy2).to.have.been.calledAfter(spy1);
    expect(wrapped).to.have.been.calledBefore(spy1);
    expect(wrapped).to.have.been.calledBefore(spy2);
  });

  it("should accept a variable number of before callbacks", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1, spy2);
    fn();

    expect(spy1).to.have.been.calledAfter(wrapped);
    expect(spy2).to.have.been.calledAfter(spy1);
    expect(wrapped).to.have.been.calledBefore(spy1);
    expect(wrapped).to.have.been.calledBefore(spy2);
  });
});
