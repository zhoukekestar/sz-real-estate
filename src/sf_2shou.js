/* 楼盘销售明细 */
// http://sz.tmsf.com/newhouse/property_33_134035_basicinfo.htm
//
async function fetchDocument(url) {
  var text = await fetch(url).then(t => t.text());
  var doc = document.createElement('div');
  doc.innerHTML = text;
  return doc;
}

async function fetchList(url) {
  const doc = await fetchDocument(url);
  return Array.from(doc.querySelectorAll('#tabelTest > tbody > tr'))
    .filter(t => /地址/.test(t.innerText))
    .map(t =>
      t.innerText
        .replace(/[ \f\r\t\v]/g, '')
        .replace(/\n+/g, '\n')
        .replace(/\[\n.*区\n\]/g, '')
        .replace('地址:\n', '')
        .replace('万元', '')
        .replace('㎡\n', '')
        .replace(/\n/g, '\t')
    );
}

async function getData(url) {
  const list = await fetchList(url);
  return list.map(t => t)
}

!(async function init() {
  let result = [];
  for (let i = 1; i < 50; i++) {
    result = result.concat(
      await getData(
        `http://www.szsoufun.cn/hirehouses/?plateId=6&page=${i}`
      )
    );
  }

  console.log(result);
  console.log(result.join('\n'))
  // console.log(result);
  // const keys = Object.keys(result[0]);

  // console.log(keys.join('\t'))
  // console.log(
  //   result
  //     .map(t => keys.map(k => t[k]).join("\t"))
  //     .join("\n")
  // );
})();
