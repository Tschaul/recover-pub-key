var crypto = require('crypto')
var BigInteger = require('bigi')
var ecdsa = require('ecdsa')

// Given a Lightning Network payment request (example below) first decode it (e.g. using https://lndecode.com/)
//
// Example payment request:
// lnbc1u1pdldz90rzjqwryaup9lh50kkranzgcdnn2fgvx390wgj5jd07rwr3vxeje0glc7zrg3uqqvmqqqqqqqqlgqqqqqeqqjqfppqguas747mh99nlker58r8tks2wqakz5cjdq8w3jhxaqxqy9gcqpp5hnsfx292pjpcw3fld4pmh03feaej5w4vagquerj687adjezrmq9sxy53xc26650qa60xpdpasg4maa0uqzez4w68f57mxt9f9x8l0v2y94eaxh79fjkz7cf86y6qsgddtejs7cv6n7k3ra0gfzl9952e3cqqcajylu

// from the decoded result extract the signed data, and r,s and the recver flag from the signature.
var signed_data = BigInteger.fromHex("6c6e626331750b7ed115e31480e193bc097f7a3ed61f662461b39a92861a257b912a49aff0dc38b0d9965e8fe3c21a23c0019b0000000000fa000000190024048420473b0f57dbb94b3fdb23a1c675da0a703b615312680ee8cae6e80c02151800434bce09328aa0c8387453f6d43bbbe29cf732a3aacea01cc8e5a3fbad96443d80b0")
var r = BigInteger.fromHex("312913615ad51e0ee9e60b43d822bbef5fc00b22abb474d3db32ca9298ff7b14");
var s = BigInteger.fromHex("42d73d35fc54cac2f6127d1340821ad5e650f619a9fad11f5e848be52d1598e0");
var recovery_flag = 0;

// now the signature is reconstructed
var sig = new ecdsa.ECSignature(r,s);

// the ecdsa package is used to recover the pub key
var Q = ecdsa.recoverPubKey(signed_data, sig, recovery_flag)

// finally the pubkey is logged encoded as buffer
console.log(Q.getEncoded().toString('hex')) //true