window.onload = function() {
  if (new Boolean(false)) {
    console.log(55555555555);
  }
  
  // topic： https://leetcode-cn.com/problems/4sum-ii/submissions/
  
  // function1, memory usage is too large
  function findCount1(arr1, arr2, arr3, arr4) {
    const length = arr1.length;
    const sumObj = {};
    let count = 0;

    function setSumObj(sum, index = 0) {
      if (!sumObj[sum]) {
        sumObj[sum] = [0, 0];
      }

      const sumArr = sumObj[sum];
      sumArr[index] += 1;
    }

    for (let i = 0; i < length; i++) {
      const firstNum1 = arr1[i];
      const firstNum2 = arr3[i];

      for (let j = 0; j < length; j++) {
        const secondNum1 = arr2[j];
        const secondNum2 = arr4[j];

        setSumObj(firstNum1 + secondNum1);
        setSumObj(firstNum2 + secondNum2, 1);
      }
    }

    for (let sum in sumObj) {
      const sumArr = sumObj[sum];

      if (sum === '0') {
        const [count1, count2] = sumArr;
        count += count1 * count2;
        continue;
      }

      const sumAbsArr = sumObj[-sum];

      if (sumAbsArr) {
        const [count1, count2] = sumArr;
        const [count3, count4] = sumAbsArr;
        count += count1 * count4 + count2 * count3;

        delete sumObj[-sum];
      }
    }

    return count;
  }


  function findCount2(arr1, arr2, arr3, arr4) {
    const length = arr1.length;
    const sumObj1 = new Map();
    const sumObj2 = new Map();

    function setSumObj(sumObj, sum) {
      const num = sumObj.get(sum) || 0;
      sumObj.set(sum, num + 1);
    }

    for (let i = 0; i < length; i++) {
      const firstNum1 = arr1[i];
      const firstNum2 = arr3[i];

      for (let j = 0; j < length; j++) {
        const secondNum1 = arr2[j];
        const secondNum2 = arr4[j];

        setSumObj(sumObj1, firstNum1 + secondNum1);
        setSumObj(sumObj2, firstNum2 + secondNum2);
      }
    }

    let forEachObj = null;
    let searchObj = null;

    if (sumObj1.size < sumObj2.size) {
      forEachObj = sumObj1;
      searchObj = sumObj2;
    } else {
      forEachObj = sumObj2;
      searchObj = sumObj1;
    }

    let count = 0;

    forEachObj.forEach((count1, key) => {
      const count2 = searchObj.get(-key);

      if (count2) {
        count += count1 * count2;
      }
    });

    return count;
  }

  const testCount = findCount2(
    [-1, 1],
    [-1, 1],
    [2, -2],
    [0, 0],
  );
  
  console.log(testCount);



  function NumberOf(base) {
    const type = typeof base;

    if (type === 'object') {
      if (base === null) {
        return 0;
      }

      let value = NaN;
      if (typeof base.valueOf === 'function') {
        value = baseTypeNumberOf(base.valueOf());
      }

      if (Number.isNaN(value)) {
        if (typeof base.toString === 'function') {
          value = baseTypeNumberOf(base.toString());
        }
      }

      return value;
    } else {
      return baseTypeNumberOf(base, type);
    }
  }

  function baseTypeNumberOf(base, type) {
    if (base === null) {
      return 0;
    }

    if (type === undefined) {
      type = typeof base;
    }

    switch (type) {
      case 'boolean': return base ? 1 : 0;
      case 'number': return base;
      case 'undefined':
      case 'string':
        const regZ = /^-?\d+$/;
        const regX = /^-?(\d*\.\d+|\d+\.\d*)$/;
        const regS = /^0x[\da-f]+$/i;
        const regB = /^0o[0-7]+$/i;
        const regE = /^0b[0|1]+$/i;
        // ''
        if (base === '') {
          return 0;
        }
        // 整数（负数）
        // 小数 (.34, 12.)
        // 十六进制，八进制，二进制数
        else if (
          regZ.test(base) ||
          regX.test(base) ||
          regS.test(base) ||
          regB.test(base) ||
          regE.test(base)
        ) {
          return new Number(base).valueOf();
        }
        // 其他 => NaN
        else {
          return NaN;
        }
      default:
        return NaN;
    }
  }

  console.log(NumberOf({})); // NaN
  console.log(NumberOf({ valueOf: () => 1})); // 1
  console.log(NumberOf({ valueOf: () => '12'}));  // 12
  console.log(NumberOf([2]));  // 2
  console.log(NumberOf(true)); // 1
  console.log(NumberOf(97)); // 97
  console.log(NumberOf(0xa)); // 10
  console.log(NumberOf(-.1)); // -0.1
  console.log(NumberOf(null)); // 0
  console.log(NumberOf(undefined)); // NaN
  console.log(NumberOf('0xa')); // 10
  console.log(NumberOf('0x1f')); // 31
  console.log(NumberOf('0b11')); // 3
  console.log(NumberOf('1234')); // 1234
  console.log(NumberOf('1234abc')); // NaN
  console.log(NumberOf('12.')); // 12
  console.log(NumberOf('-.34')); // -0.34
  console.log(NumberOf('Hello World')); // NaN

}
