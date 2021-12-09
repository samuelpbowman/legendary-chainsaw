const path = require('path');
const readline = require('readline');
const MuteStream = require('mute-stream');
const kpio = require('keepass.io');

const argv = process.argv.slice(2);
const keyfile = path.resolve(__dirname, argv[1]);
const ms = new MuteStream;

ms.pipe(process.stdout);
const rl = readline.createInterface({
  input: process.stdin,
  output: ms,
  terminal: true,
});

const db1 = new kpio.Database();
const db2 = new kpio.Database();

rl.question('Enter your password: ', result => {
  db1.addCredential(new kpio.Credentials.Password(result));
  db1.addCredential(new kpio.Credentials.Keyfile(keyfile));

  const name1 = path.resolve(__dirname, argv[0]);
  let api1;

  db1.loadFile(argv[0], error => {
    if(error) throw error;
    api1 = db1.getRawApi().get();
  });

  let data1 = api1;
  console.dir(data1);
});


