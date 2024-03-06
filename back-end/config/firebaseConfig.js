const admin = require("firebase-admin");

const serviceAccount = require("./dream-share-4f2af-firebase-adminsdk-1qc3w-281b5a4f07.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://dream-share-4f2af.appspot.com",
});
//Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket
};
