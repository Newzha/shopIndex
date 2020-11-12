const data = [
    {
      "id": 1,
      "title": "HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）",
      "price": 3899,
      "time": "2017-03-15",
      "hot": 198,
      "img": "img/1.jpg"
    },
    {
      "id": 2,
      "title": "HUAWEI 麦芒6 4GB+64GB 全网通版（曜石黑）",
      "price": 2399,
      "time": "2017-02-08",
      "hot": 25,
      "img": "img/2.jpg"
    },
    {
      "id": 3,
      "title": "华为畅享7 2GB+16GB 全网通标配版（香槟金）",
      "price": 899,
      "time": "2017-01-25",
      "hot": 568,
      "img": "img/3.jpg"
    },
    {
      "id": 4,
      "title": "HUAWEI nova 2 Plus 4GB+64GB 全网通版（曜石黑）",
      "price": 2399,
      "time": "2016-12-30",
      "hot": 20000,
      "img": "img/4.jpg"
    },
    {
      "id": 5,
      "title": "HUAWEI nova 2 4GB+64GB 全网通版（玫瑰金）",
      "price": 2199,
      "time": "2016-01-30",
      "hot": 1032654,
      "img": "img/5.jpg"
    },
    {
      "id": 6,
      "title": "华为畅享7 Plus 4GB+64GB 全网通高配版（香槟金）",
      "price": 1699,
      "time": "2018-01-01",
      "hot": 1,
      "img": "img/6.jpg"
    },
    {
      "id": 7,
      "title": "HUAWEI nova 青春版 4GB+64GB 全网通版（樱语粉）",
      "price": 1799,
      "time": "2017-02-19",
      "hot": 400,
      "img": "img/7.jpg"
    },
    {
      "id": 8,
      "title": "HUAWEI P10 4GB+64GB 全网通版（曜石黑）",
      "price": 3488,
      "time": "2017-01-25",
      "hot": 240,
      "img": "img/8.jpg"
    },
    {
      "id": 9,
      "title": "HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）",
      "price": 4488,
      "time": "2014-01-01",
      "hot": 12345678,
      "img": "img/9.jpg"
    },
    {
      "id": 10,
      "title": "HUAWEI Mate 9 保时捷设计 6GB+256GB 全网通版（曜石黑）",
      "price": 8999,
      "time": "2014-01-01",
      "hot": 12345678,
      "img": "img/10.jpg"
    }
  ];
/**
 * 1、获取数据和实现数据绑定
 *  =>真实项目中，页面中大部分数据都不是写死的，而是动态绑定的
 *   A:从服务器端获取到数据（基于AJAX/JSONP等技术，通过服务器端提供的数据API接口地址，把数据请求回来）
 *   B:把获取的数据进行解析
 *   C:把数据绑定在HTML页面中(数据绑定)：ES6中的模板字符串
 */

// // 获取数据
// let product = null;
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'json/product.json', true);
// xhr.onreadystatechange = function() {
//     console.log('onreadystatechange xhr', xhr)
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log('xhr', xhr)
//         product = xhr.responseText;
//     }
// };
// xhr.send(null);
// //=>获取的结果是一个字符串:"JSON格式的字符串"，我们此时需要把获取的字符串转换为对象
// console.log('product', product)
// product = JSON.parse(product);

//=>数据绑定（DOM数据绑定）：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面指定容器中
/*
 * 1.字符串拼接
 *   ->传统字符串拼接
 *   ->ES6模板字符串拼接
 *   ->模板引擎:原理也是字符串拼接
 *
 * 2.动态创建DOM
 *   ->createElement
 *   ->appendChild
 *   弊端：操作起来太麻烦，而且性能消耗更大（DOM回流）
 */
let list = document.getElementById('list');
let str = ``;// ES6模板字符串
for (let i = 0; i < data.length; i++) {
    let {
        title,
        img = 'img/1.jpg',//=>没有返回IMG,我们用默认图占位
        price
    } = data[i];

    str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`;
}
list.innerHTML = str;