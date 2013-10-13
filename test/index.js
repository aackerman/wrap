"use strict"
var wrap = require('../index');

describe("#before", function(){
  it("should call the before function before the wrapped function", function(){
    var spy1    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1);
    fn();

    spy1.should.have.been.calledOnce;
    wrapped.should.have.been.calledOnce;

    spy1.should.have.been.calledBefore(wrapped);
    wrapped.should.have.been.calledAfter(spy1);
  });

  it("should be allowed to be wrapped several times", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1);
    var fn2     = wrap.before(fn, spy2);

    fn2();

    spy1.should.have.been.calledBefore(wrapped);
    spy2.should.have.been.calledBefore(spy1);
    wrapped.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy2);
  });

  it("should accept a variable number of before callbacks", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.before(wrapped, spy1, spy2);
    fn();

    spy1.should.have.been.calledBefore(wrapped);
    spy2.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy2);
  });
});

describe('#after', function(){
  it("should call the before function before the wrapped function", function(){
    var spy1    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1);
    fn();

    spy1.should.have.been.calledOnce;
    wrapped.should.have.been.calledOnce;

    spy1.should.have.been.calledAfter(wrapped);
    wrapped.should.have.been.calledBefore(spy1);
  });

  it("should be allowed to be wrapped several times", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1);
    var fn2     = wrap.after(fn, spy2);

    fn2();

    spy1.should.have.been.calledAfter(wrapped);
    spy2.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledBefore(spy1);
    wrapped.should.have.been.calledBefore(spy2);
  });

  it("should accept a variable number of before callbacks", function(){
    var spy1    = sinon.spy();
    var spy2    = sinon.spy();
    var wrapped = sinon.spy();
    var fn      = wrap.after(wrapped, spy1, spy2);
    fn();

    spy1.should.have.been.calledAfter(wrapped);
    spy2.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledBefore(spy1);
    wrapped.should.have.been.calledBefore(spy2);
  });
});
