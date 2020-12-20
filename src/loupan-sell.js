/* 楼盘总体销售数据 */


// // 可售
// const sellUrl = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page=`;

// // 可售并小于 50
// const sellUrl50 = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=1&housetype=&page=`;

// // 已售
// const soldUrl = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=2&housetype=&page=`;

// // 已售并小于 50
// const soldUrl50 = `http://sz.tmsf.com/newhouse/property_33_133319_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=2&housetype=&page=`;


async function fetchDocument(url) {
  var text = await fetch(url).then(t => t.text());
  var doc = document.createElement('div');
  doc.innerHTML = text;
  return doc;
}

async function fetchTotalNumber(url) {
  const doc = await fetchDocument(url);
  return doc.querySelector('div.bggrey.w1000 > div:nth-child(8) > div > div.spagenext > span').innerText.match(/总数：(\d+)套/)[1];
}

async function transUrl(url) {
  const sellUrl = url.replace('_info.htm', '_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page=');
  const sellUrl50 = url.replace('_info.htm', '_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=1&housetype=&page=');
  const soldUrl = url.replace('_info.htm', '_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=2&housetype=&page=');
  const soldUrl50 = url.replace('_info.htm', '_price.htm?isopen=1&presellid=&buildingid=&area=0_50&allprice=&housestate=2&housetype=&page=');

  return {
    sell: await fetchTotalNumber(sellUrl),
    sell50: await fetchTotalNumber(sellUrl50),
    sold: await fetchTotalNumber(soldUrl),
    sold50: await fetchTotalNumber(soldUrl50),
  }
}

!(async function init() {
  const urls = `http://sz.tmsf.com/newhouse/property_33_133319_info.htm
http://sz.tmsf.com/newhouse/property_33_209800506_info.htm
http://sz.tmsf.com/newhouse/property_33_431137829_info.htm
http://sz.tmsf.com/newhouse/property_33_1770989_info.htm
http://sz.tmsf.com/newhouse/property_33_135424_info.htm
http://sz.tmsf.com/newhouse/property_33_133125_info.htm
http://sz.tmsf.com/newhouse/property_33_1694875_info.htm
http://sz.tmsf.com/newhouse/property_33_135092_info.htm
http://sz.tmsf.com/newhouse/property_33_133437_info.htm
http://sz.tmsf.com/newhouse/property_33_134855_info.htm
http://sz.tmsf.com/newhouse/property_33_134035_info.htm
http://sz.tmsf.com/newhouse/property_33_274318_info.htm
http://sz.tmsf.com/newhouse/property_33_134895_info.htm
http://sz.tmsf.com/newhouse/property_33_135133_info.htm
http://sz.tmsf.com/newhouse/property_33_274286_info.htm
http://sz.tmsf.com/newhouse/property_33_135043_info.htm
http://sz.tmsf.com/newhouse/property_33_133594_info.htm
http://sz.tmsf.com/newhouse/property_33_3158256_info.htm
http://sz.tmsf.com/newhouse/property_33_135004_info.htm
http://sz.tmsf.com/newhouse/property_33_201740937_info.htm
http://sz.tmsf.com/newhouse/property_33_311176_info.htm
http://sz.tmsf.com/newhouse/property_33_133521_info.htm
http://sz.tmsf.com/newhouse/property_33_292204_info.htm`.split('\n');

  const result = [];
  for (let i = 0; i < urls.length; i++) {
    result.push(await transUrl(urls[i]));
  }
  console.log(result);

  console.log(
    result
      .map(t => `${t.sell}\t${t.sell50}\t${t.sold}\t${t.sold50}`)
      .join("\n")
  );
})()