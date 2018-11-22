var crypto = require('crypto')
var BigInteger = require('bigi')
var ecdsa = require('ecdsa')
var crypto = require('crypto')

// Given a Lightning Network payment request (example below) first decode it (e.g. using https://lndecode.com/)
//
// Example payment request:
// lnbc1u1pdldz90rzjqwryaup9lh50kkranzgcdnn2fgvx390wgj5jd07rwr3vxeje0glc7zrg3uqqvmqqqqqqqqlgqqqqqeqqjqfppqguas747mh99nlker58r8tks2wqakz5cjdq8w3jhxaqxqy9gcqpp5hnsfx292pjpcw3fld4pmh03feaej5w4vagquerj687adjezrmq9sxy53xc26650qa60xpdpasg4maa0uqzez4w68f57mxt9f9x8l0v2y94eaxh79fjkz7cf86y6qsgddtejs7cv6n7k3ra0gfzl9952e3cqqcajylu
// lnbc1530n1pdldg6urzjqwryaup9lh50kkranzgcdnn2fgvx390wgj5jd07rwr3vxeje0glc7zrg3uqqvmqqqqqqqqlgqqqqqeqqjqfppqguas747mh99nlker58r8tks2wqakz5cjdqvd9h8vmmfvdjsxqy9gcqpp540sgqyqpjv0hg59gsnn0xcnluex6tm78t85qvz56cyzdtc2wa2kq698tycum2kn8qfstkk74r222638mqnrqfvcj4cse4gpe5cutmdwjnxetwj5mha895y9a9qhm5k4uy7zv7yrcxrzuuzdln74whnqnfkspeuz7nq

// from the decoded result extract the signed data, and r,s and the recver flag from the signature.
var signed_data_hex = "6c6e6263313533306e0b7ed46b831480e193bc097f7a3ed61f662461b39a92861a257b912a49aff0dc38b0d9965e8fe3c21a23c0019b0000000000fa000000190024048420473b0f57dbb94b3fdb23a1c675da0a703b6153126818d2dcecded2c6ca06010a8c0021a55f0400800c98fba2854427379b13ff326d2f7e3acf403054d60826af0a77556000";
var hash = crypto.createHash('sha256').update(new Buffer(signed_data_hex, 'hex')).digest();
var e = BigInteger.fromBuffer(hash);

var r = BigInteger.fromHex("d14eb2639b55a670260bb5bd51a94ad44fb04c604b312ae219aa039a638bdb5d");
var s = BigInteger.fromHex("299b2b74a9bbf4e5a10bd282fba5abc2784cf107830c5ce09bf9faaebcc134da");
var recovery_flag = 1;

// now the signature is reconstructed
var sig = new ecdsa.ECSignature(r,s);

// the ecdsa package is used to recover the pub key
var Q = ecdsa.recoverPubKey(e, sig, recovery_flag)

// finally the pubkey is logged encoded as buffer
console.log(Q.getEncoded().toString('hex'))
// 0251df83778f1ee40a84313df093874abef209568ca65f5c12128e61538fc84da6