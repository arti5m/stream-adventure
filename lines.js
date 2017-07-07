const through = require('through2');
const split = require('split');

let odd = true;

const write = function(line, encoding, next) {
    this.push(
      odd ?
        `${line.toString().toLowerCase()}\n` :
        `${line.toString().toUpperCase()}\n`
    );
  odd = !odd;
  next();
};

const end = function(done) {
  done();
};

const stream = through(write, end);

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout);
