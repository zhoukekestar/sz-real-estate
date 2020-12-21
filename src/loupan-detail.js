/* 楼盘销售明细 */
// http://sz.tmsf.com/newhouse/property_33_134035_basicinfo.htm
//
async function fetchDocument(url) {
  var text = await fetch(url).then(t => t.text());
  var doc = document.createElement('div');
  doc.innerHTML = text;
  return doc;
}

async function fetchDetail(url) {
  const doc = await fetchDocument(url);
  return doc.querySelector('div.bggrey.w1000 > div:nth-child(2) > div.fl.trendl > div > div.details-tt > div:nth-child(4)').innerText.replace(/[ \f\r\t\v]/g, '').replace(/\n+/g, '\n').replace(/：\n/g, ':').split('\n').filter(t => t)
}

async function transUrl(url) {
  const detailUrl = url.replace('_info.htm', '_basicinfo.htm');
  const data = await fetchDetail(detailUrl);

  const res = {};
  data.map(t => t.split(':')).forEach(d => {
    try {
      res[d[0].trim()] = d[1].trim();
    } catch(err) {
      console.log('Error', d);
    }
  });

  return res;
}

!(async function init() {
  const urls = `http://sz.tmsf.com/newhouse/property_33_209800506_info.htm
http://sz.tmsf.com/newhouse/property_33_1770989_info.htm
http://sz.tmsf.com/newhouse/property_33_135424_info.htm
http://sz.tmsf.com/newhouse/property_33_133319_info.htm
http://sz.tmsf.com/newhouse/property_33_133125_info.htm
http://sz.tmsf.com/newhouse/property_33_135092_info.htm
http://sz.tmsf.com/newhouse/property_33_134895_info.htm
http://sz.tmsf.com/newhouse/property_33_431137829_info.htm
http://sz.tmsf.com/newhouse/property_33_311176_info.htm
http://sz.tmsf.com/newhouse/property_33_134855_info.htm
http://sz.tmsf.com/newhouse/property_33_134035_info.htm
http://sz.tmsf.com/newhouse/property_33_135004_info.htm
http://sz.tmsf.com/newhouse/property_33_135043_info.htm
http://sz.tmsf.com/newhouse/property_33_135133_info.htm
http://sz.tmsf.com/newhouse/property_33_133594_info.htm
http://sz.tmsf.com/newhouse/property_33_292204_info.htm
http://sz.tmsf.com/newhouse/property_33_133521_info.htm
http://sz.tmsf.com/newhouse/property_33_1694875_info.htm
http://sz.tmsf.com/newhouse/property_33_274318_info.htm
http://sz.tmsf.com/newhouse/property_33_133437_info.htm
http://sz.tmsf.com/newhouse/property_33_201740937_info.htm
http://sz.tmsf.com/newhouse/property_33_274286_info.htm
http://sz.tmsf.com/newhouse/property_33_3158256_info.htm`.split('\n');

  const result = [];
  for (let i = 0; i < urls.length; i++) {
    result.push(await transUrl(urls[i]));
  }
  console.log(result);
  const keys = Object.keys(result[0]);

  console.log(keys.join('\t'))
  console.log(
    result
      .map(t => keys.map(k => t[k]).join("\t"))
      .join("\n")
  );
})()