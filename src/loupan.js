var NUMBER_MAP = {
  numberzero: 0,
  numbbzero: 0,
  numberone: 1,
  numbbone: 1,
  numbertwo: 2,
  numbbtwo: 2,
  numberthree: 3,
  numbbthree: 3,
  numberfour: 4,
  numbbfour: 4,
  numberfive: 5,
  numbbfive: 5,
  numbersix: 6,
  numbbsix: 6,
  numberseven: 7,
  numbbseven: 7,
  numbereight: 8,
  numbbeight: 8,
  numbernine: 9,
  numbbnine: 9,
  numberdor: '.',
  numbbdor: '.',
};
function parseElement(div) {
  const arr =
    div.innerHTML.match(/number([^"]*)/g) ||
    div.innerHTML.match(/numbb([^"]*)/g);
  if (!arr || arr.length === 0) return '';
  return Number(arr.map(t => NUMBER_MAP[t]).join(''));
}

function getPageArray(doc) {
  return Array.from(doc.querySelectorAll('.searchpageall li'))
    .map(li => {
      // console.log(li);

      return {
        href: li.querySelector('a').href,
        name: li.querySelector('.build_word01 a').innerText,
        type: li.querySelector('div.build_txt.line26 > div:nth-child(2) > p')
          .innerText,
        loc: li.querySelector('div.build_txt.line26 > div:nth-child(3) > p')
          .innerText,
        price: parseElement(li.querySelector('font.colordg .word1')),
        tel:
          li.querySelector('font.colordg') &&
          li.querySelector('font.colordg').innerText,
      };
    })
    .map(t => `${t.name.trim()}\t${t.type}\t${t.loc}\t${t.price}\t${(t.tel || '').trim()}\t${t.href.trim()}`);
}

let arr = [];
for (var number = 1; number < 5; number++) {
  const href = `http://sz.tmsf.com/newhouse/property_searchall.htm?searchkeyword=&keyword=&sid=33&districtid=33068301&areaid=&dealprice=&propertystate=2&propertytype=&ordertype=&priceorder=&openorder=&view720data=&page=${number}&bbs=&avanumorder=&comnumorder=`;

  var text = await fetch(href).then(t => t.text());
  var doc = document.createElement('div');
  doc.innerHTML = text;

  const temp = getPageArray(doc);
  // console.log(temp);
  arr = arr.concat(temp);
}

console.log(arr)
console.log(arr.join('\n'));
