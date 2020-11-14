/*

/!**
 * 1、获取数据和实现数据绑定
 *  =>在项目中，页面中大部分数据都不是写死的，而是动态绑定的
 *   A:从服务器端获取到数据（基于AJAX/JSONP等技术，通过服务器端提供的数据API接口地址，把数据请求回来）
 *   B:把获取的数据进行解析
 *   C:把数据绑定在HTML页面中(数据绑定)：ES6中的模板字符串
 *!/

// 获取数据
let product = null;
let xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function() {
  console.log('onreadystatechange xhr', xhr)
  if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('xhr', xhr)
      product = xhr.responseText;
    }
};
xhr.send(null);
// //=>获取的结果是一个字符串:"JSON格式的字符串"，我们此时需要把获取的字符串转换为对象
console.log('product', product)
product = JSON.parse(product);

//=>数据绑定（DOM数据绑定）：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面指定容器中
/!*
 * 1.字符串拼接
 *   ->传统字符串拼接
 *   ->ES6模板字符串拼接
 *   ->模板引擎:原理也是字符串拼接
 *
 * 2.动态创建DOM
 *   ->createElement
 *   ->appendChild
 *   弊端：操作起来太麻烦，而且性能消耗更大（DOM回流）
 *!/
let list = document.getElementById('list');
let str = ``;// ES6模板字符串
for (let i = 0; i < product.length; i++) {
    let {
        title,
        img = 'img/1.jpg',//=>没有返回IMG,我们用默认图占位
        price
    } = product[i];

    str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`;
}
list.innerHTML = str;
*/

// 为了避免全局下的变量名冲突，将功能拆分为不同的模块放在IITE中执行
let listBox = document.getElementById('list')
  , headerBox = document.getElementById('header')
  , linkList = headerBox.getElementsByTagName('a')
  , productList = listBox.getElementsByTagName('li');

!(function () {
  /**
   * 1、获取数据并实现数据绑定
   */

  // AJAX
  let product = null
    , xhr = new XMLHttpRequest();
  xhr.open('GET', 'json/product.json', false);
  xhr.onreadystatechange = function () {
    console.log('xhr onreadystatechange', xhr)
    xhr.readyState === 4 && xhr.status === 200
      ? product = xhr.responseText
      : null;

    // format data
    product ? product = JSON.parse(product) : null;
  };
  xhr.send(null);

  // bind data
  let str = ``;
  for (let i = 0; i < product.length; i++) {
    let {
      title,
      img = 'img/1.jpg',
      price,
      time,
      hot
    } = product[i];

    str += `<li data-price="${price}"
                data-time="${time}" 
                data-hot="${hot}"
        ><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`
  }
  listBox.innerHTML = str;
})();

!(function () {
  /**
   * 按照价格升序排列
   */

  let sortList = function () {
    // 1.基于getElementsByTagName获取的元素集合是一个类数组，
    //   不能直接使用数组中的SORT方法(我们首先把它转换为数组,然后在排序)
    // 用这种借用SLICE方式操作元素集合或者节点集合，在IE6~8中不兼容
    let aProduct = [].slice.call(productList);
    /*
     let _this=this;
     aProduct.sort(function(a,b){
         //this:window
         _this.flag
     });*/
    // 2.基于sort给所有的LI按照其价格进行排序
    aProduct.sort((a, b) => {
      //=>a:数组中的当前项
      //=>b:数组中的下一项
      // return a-b; 数组当前项减去下一项，
      //  如果返回的值大于零，则A/B交换位置，
      //  否则小于等于零什么都不做

      //A是当前LI,B下一个LI,我们应该获取出每个LI的价格,
      // 让价格相减从而实现排序（首先数据绑定的时候，
      // 我们可以把后面需要用到的“价格/日期/销量”等信息存储到LI的 自定义属性 上
      // [在结构中显示 后期只能基于getAttribute这种模式获取到]，
      // 后期需要用到这个值的时候，我们基于自定义属性获取到即可）
      let aPrice = a.getAttribute('data-price')
        , bPrice = b.getAttribute('data-price');
      return (aPrice - bPrice) * this.flag;
    });
    // 3.按照排好序的数组，我们把LI重新增加到页面中
    for (let i = 0; i < aProduct.length; i++) {
      let curLi = aProduct[i];
      // 向容器的末尾追加新元素。但是页面中不是20个,还是原有的10个,只不过顺序改变了
      listBox.appendChild(curLi)
    }
  };

  // 做点击切换升降序排列
  linkList[1].flag = -1;
  linkList[1].onclick = function () {
    this.flag *= -1; // 每一次点击让flag的值从1、-1来回切换
    // 执行sortList，让方法中的THIS关键字改为操作的A标签
    //  (箭头函数虽然很强大，但是不可以乱用，尤其是在需要改变函数中this的情况下，
    //  箭头函数中没有自己的this，都是默认继承上下文中的，我们基于call也改不了)
    sortList.call(this);
  };
})();

/*
 * DOM的映射机制
 *   页面中的HTML元素，和JS中通过相关方法获取到的元素集合或者元素对象存在映射关系(一个改另外一个会跟着自动修改)
 *
 *   xxx.style.color='red' : 把xxx元素对象对应堆内存中的style属性下的color属性值修改为'red'（本质操作的是JS堆内存）；
 *    但是由于DOM映射关系，页面中的标签和XXX元素对象是绑在一起的，我们修改元素对象空间的值，页面中的元素会按照最新的值进行渲染；
 *
 *   在元素绑定前，我们获取容器中元素，得到一个空的元素集合，元素数据绑定后，我们不需要重新获取，
 *    DOM的映射机制会帮我们把新增加的元素映射到之前获取的空集合中，让其变为有元素的集合。例如productList
 *    （querySelectorAll获取的集合是静态集合(staticNodeList)，不存在上述所谓的映射机制，
 *     所以基于这种办法，数据绑定完成后需要重新的获取一次才可以）
 *
 *  appendChild在追加元素对象的时候，如果这个元素之前容器中已经存在，
 *   此时不是克隆一份新的追加到末尾，而是把原有的元素移动到末尾位置
 *
 *  ...
 */