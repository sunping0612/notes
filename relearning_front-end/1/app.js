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
}
