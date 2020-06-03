// namespacing 
const sortingVisualizerApp = {
    sortingAlgo: 'hello',
    arrayLength: '',
    array: []
};
// Create an init method
sortingVisualizerApp.init = function () {

    $('form').on('submit', function (e) {
        e.preventDefault();
        sortingVisualizerApp.sortingAlgo = $('#algorithms option:selected').val();
        sortingVisualizerApp.arrayLength = parseInt($('input[type=number]').val());
        sortingVisualizerApp.resetArray(sortingVisualizerApp.arrayLength);
        console.log(sortingVisualizerApp.array);
        sortingVisualizerApp.sortingAlgorithmCheck(sortingVisualizerApp.sortingAlgo);

        console.log(sortingVisualizerApp.array);
    });
}
// Create a function that checks the algorithm that the user chose.
sortingVisualizerApp.sortingAlgorithmCheck = function (userAlgoChoice) {
    if (userAlgoChoice === 'mergeSort') {
        sortingVisualizerApp.array = sortingAlgorithms.mergeSort(sortingVisualizerApp.array);
    }
}
//  Create a function that generates (appends) the random bar form the graph 
sortingVisualizerApp.generateArrayBar = function (height, index) {
    $('.arrayGraph').append(`<div class="arrayBar arrayBar${index}"><div>`);
    $(`.arrayBar${index}`).css('height', `${height}px`);
}

// Create a funcction that resets the array 
sortingVisualizerApp.resetArray = function (arrayLength) {
    sortingVisualizerApp.array = [];
    let randomNumber = 0;
    $('.arrayGraph').empty();
    for (let i = 0; i < arrayLength; i++) {
        randomNumber = sortingVisualizerApp.randomNumber();
        sortingVisualizerApp.array.push(randomNumber);
        sortingVisualizerApp.generateArrayBar(randomNumber, i);
    }
}
// Create a method that generates a random number
sortingVisualizerApp.randomNumber = function () {
    return Math.floor(Math.random() * (400 - 6) + 5);
}

sortingVisualizerApp.swapBars = function (animation) {
    for (let i = 0; i < animation.length; i++) {
        const $arrayBar = $(`.arrayBar${i}`);
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOne, barTwo] = animation[i];
            console.log('barsOne and Two', barOne, barTwo);
        }
    }
}

const sortingAlgorithms = {
    getMergeAnimation: function (unsortedArr) {
        const animations = [];
        if (unsortedArr.length <= 1) {
            return unsortedArr;
        }
        const auxillaryArray = unsortedArr.slice();
        this.mergeSort(unsortedArr, 0, unsortedArr.length, auxillaryArray, animation);
    },
    mergeSort: function (array, startIndex, endIndex, auxillaryArray, animations) {
        let middle = Math.floor(unsortedArr.length / 2);
        let leftArr = unsortedArr.slice(0, middle);
        let rightArr = unsortedArr.slice(middle);
        // console.log('left', leftArr);
        // console.log('right', rightArr);
        return sortingAlgorithms.merge(sortingAlgorithms.mergeSort(leftArr), sortingAlgorithms.mergeSort(rightArr))
    },
    merge: function (left, right) {
        const results = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                results.push(left[leftIndex]);
                leftIndex++;
            } else {
                results.push(right[rightIndex]);
                rightIndex++;
            }
        }
        // There will be an extra one that will be left when getting out of the while loop so we need to concat the index
        return results.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
}
$(document).ready(sortingVisualizerApp.init());