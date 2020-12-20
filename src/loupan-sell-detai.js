 /* 楼盘销售明细 */


 // http://sz.tmsf.com/newhouse/property_33_431137829_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=1&housetype=&page=1

  var d = new Date();
  var FINALL_KEY = `finallyData_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;

  var NUMBER_MAP = {
    'numberzero': 0,
    'numberone': 1,
    'numbertwo': 2,
    'numberthree': 3,
    'numberfour': 4,
    'numberfive': 5,
    'numbersix': 6,
    'numberseven': 7,
    'numbereight': 8,
    'numbernine': 9,
    'numberdor': '.'
  }
  function parseTd(div) {
    const arr = div.innerHTML.match(/number([^"]*)/g);
    if (!arr || arr.length === 0) return '';
    return Number(arr.map(t => NUMBER_MAP[t]).join(''));
  }
  !(async () => {

    // 如果重新开始抓数据，记得先清空这里的数据
    var finallyData = JSON.parse(localStorage.getItem(FINALL_KEY) || '[]');;

    // 找到列表中的所有链接
    for (var number = 1; number < 100000; number++) {
      const href = `http://sz.tmsf.com/newhouse/property_33_431137829_price.htm?isopen=1&presellid=&buildingid=&area=&allprice=&housestate=&housetype=&page=${number}`;

      var text = await fetch(href).then(t => t.text())
      var doc = document.createElement("div");
      doc.innerHTML = text;


      var res = [];
      for (const tr of doc.querySelectorAll('div.bggrey.w1000 > div:nth-child(8) > div > div.onbuildshow_contant.colordg.ft14 > div > table > tbody.qita tr')) {
        res.push(
          Array.from(tr.querySelectorAll('td'))
          .map(t => `${parseTd(t)}${t.innerText}`.replace(/\s/g, ''))
          .map(t => t.trim())
        )
      }

      console.log(res);

      finallyData = finallyData.concat(res);

      if (res.length < 14) {
        break;
      }
    }

    localStorage.setItem(FINALL_KEY, JSON.stringify(finallyData));

    var excel = finallyData
    .map(t => `${t[0]}\t${t[1]}\t${t[2]}\t${t[3]}\t${t[4]}\t${t[5]}\t${t[6]}\t${t[7]}\t${t[8]}`)
    .join('\n');

    console.log('finallyData: ', finallyData);
    console.log(excel);

    localStorage.setItem('excel', excel);

  })();