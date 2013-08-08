"use strict"
wrap = require('../index');

describe "#before", ->

  it "should call the before function before the wrapped function", ->
    spy1 = sinon.spy();
    wrapped = sinon.spy();
    fn = wrap.before(wrapped, spy1);
    fn();

    spy1.should.have.been.calledOnce;
    wrapped.should.have.been.calledOnce;

    spy1.should.have.been.calledBefore(wrapped);
    wrapped.should.have.been.calledAfter(spy1);

  it "should be allowed to be wrapped several times", ->
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    wrapped = sinon.spy();
    fn = wrap.before(wrapped, spy1);
    fn2 = wrap.before(fn, spy2);

    fn2();

    spy1.should.have.been.calledBefore(wrapped);
    spy2.should.have.been.calledBefore(spy1);
    wrapped.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy2);

  it "should accept a variable number of before callbacks", ->
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    wrapped = sinon.spy();
    fn = wrap.before(wrapped, spy1, spy2);
    fn();

    spy1.should.have.been.calledBefore(wrapped);
    spy2.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy1);
    wrapped.should.have.been.calledAfter(spy2);


