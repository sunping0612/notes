window.onload = function() {
  if (new Boolean(false)) {
    console.log(55555555555);
  }

  let sumObj = {};

  function setSumObj(sum, index = 0) {
    const sumAbs = sum;

    if (!sumObj[sumAbs]) {
      sumObj[sumAbs] = [0, 0];
    }

    const sumArr = sumObj[sumAbs];
    sumArr[index] += 1;
  }

  function findCount(arr1, arr2, arr3, arr4) {
    const length = arr1.length;
    let count = 0;

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
      const sumAbs = sumObj[-sum];
      
      if (sumAbs) {
        const [count1, count2] = sumObj[sum];
        const [count3, count4] = sumAbs;
        count += count1 * count4 + count2 * count3;

        delete sumObj[-sum];
      }
    }

    sumObj = {};

    return count;
  }

  const testCount = findCount(
    [-1, 1],
    [-1, 1],
    [2, -2],
    [0, 0],
  );
  
  console.log(testCount);
}
