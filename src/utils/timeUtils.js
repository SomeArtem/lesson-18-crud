const delay = function (ms) {
  return new Promise((res, rej) => {
    console.log('начало');
    setTimeout(() => {
      res();
    }, ms);

  })
}

export { delay };

//delay(2000).then(() => console.log('конец'));

