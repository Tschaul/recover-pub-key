var crypto = require('crypto') //Node.js or Browserify (browser)
var BigInteger = require('bigi')

var ecdsa = require('ecdsa')

var e = BigInteger.fromHex("6c6e626331750b7ed115e31480e193bc097f7a3ed61f662461b39a92861a257b912a49aff0dc38b0d9965e8fe3c21a23c0019b0000000000fa000000190024048420473b0f57dbb94b3fdb23a1c675da0a703b615312680ee8cae6e80c02151800434bce09328aa0c8387453f6d43bbbe29cf732a3aacea01cc8e5a3fbad96443d80b0")
var r = BigInteger.fromHex("312913615ad51e0ee9e60b43d822bbef5fc00b22abb474d3db32ca9298ff7b14");
var s = BigInteger.fromHex("42d73d35fc54cac2f6127d1340821ad5e650f619a9fad11f5e848be52d1598e0");
var i = 0;

var sig = new ecdsa.ECSignature(r,s);

var Q = ecdsa.recoverPubKey(e, sig, i)
console.log(Q.getEncoded()) //true