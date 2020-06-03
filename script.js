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
        // sortingVisualizerApp.array = sortingAlgorithms.(sortingVisualizerApp.array);
        const swapAnimation = sortingAlgorithms.getMergeAnimation(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapAnimation);
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

sortingVisualizerApp.swapBars = function (animations) {
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOne, barTwo] = animations[i];
            setTimeout(() => {
                if (i % 3 === 0) {
                    $(`.arrayBar${barOne}`).css('background-color', '#EB1F1F');
                    $(`.arrayBar${barTwo}`).css('background-color', '#EB1F1F');
                } else {
                    $(`.arrayBar${barOne}`).css('background-color', '#FED606');
                    $(`.arrayBar${barTwo}`).css('background-color', '#FED606');
                }

            }, i * 10);

            console.log('barsOne and Two', barOne, barTwo);
        } else {
            setTimeout(() => {
                const [barOneIndex, newHeight] = animations[i];
                $(`.arrayBar${barOneIndex}`).css('height', `${newHeight}px`);
            }, i * 10);
        }
    }
}

const sortingAlgorithms = {
    // returns the animation array that will be used to get sequence of the index that are being  swapped arrayBar
    getMergeAnimation: function (unsortedArr) {
        const animations = [];
        // first part of merge base case when the array 
        if (unsortedArr.length <= 1) {
            return unsortedArr;
        }
        // copy of the unsorted array 
        const auxilaryArry = unsortedArr.slice();
        sortingAlgorithms.mergeSort(unsortedArr, 0, unsortedArr.length - 1, auxilaryArry, animations);
        // console.log('animations', animations);
        console.log('unsortedArr', unsortedArr);
        return animations;
    },
    mergeSort: function (unsortedArr, startIndex, endIndex, auxilaryArry, animations) {
        if (startIndex === endIndex) {
            return;
        }
        let middle = Math.floor((startIndex + endIndex) / 2);

        // recursively call mergeSort and after call merge
        sortingAlgorithms.mergeSort(auxilaryArry, startIndex, middle, unsortedArr, animations);
        sortingAlgorithms.mergeSort(auxilaryArry, middle + 1, endIndex, unsortedArr, animations);
        sortingAlgorithms.merge(unsortedArr, startIndex, middle, endIndex, auxilaryArry, animations);

        // I have to change this to get index by index visuals 
        // let leftArr = unsortedArr.slice(0, middle);
        // let rightArr = unsortedArr.slice(middle);
        //sortingAlgorithms.merge(sortingAlgorithms.mergeSort(leftArr), sortingAlgorithms.mergeSort(rightArr))
    },
    merge: function (unsortedArr, start, middle, end, auxilaryArry, animations) {

        let leftIndex = start;
        let rightIndex = start;
        let middleIndex = middle + 1;

        while (leftIndex <= middle && middleIndex <= end) {
            animations.push([leftIndex, middleIndex]);
            animations.push([leftIndex, middleIndex]);
            console.log('auxilaryArry[leftIndex]:', auxilaryArry[leftIndex]);
            if (auxilaryArry[leftIndex] <= auxilaryArry[middleIndex]) {
                animations.push([rightIndex, auxilaryArry[leftIndex]]);
                unsortedArr[rightIndex++] = auxilaryArry[leftIndex++];
            } else {
                animations.push([rightIndex, auxilaryArry[middleIndex]]);
                unsortedArr[rightIndex++] = auxilaryArry[middleIndex++];
            }
        }

        while (leftIndex <= middle) {
            animations.push([leftIndex, leftIndex]);
            animations.push([leftIndex, leftIndex]);
            animations.push([rightIndex, auxilaryArry[leftIndex]]);
            unsortedArr[rightIndex++] = auxilaryArry[leftIndex++];
        }

        while (middleIndex <= end) {
            animations.push([middleIndex, middleIndex]);
            animations.push([middleIndex, middleIndex]);
            animations.push([rightIndex, auxilaryArry[middleIndex]]);
            unsortedArr[rightIndex++] = auxilaryArry[middleIndex++];
        }
    }
}
$(document).ready(sortingVisualizerApp.init());