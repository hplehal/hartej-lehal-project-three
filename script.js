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
    let $name = $('.sortingName');
    let $definition = $('.sortingDefinition');
    if (userAlgoChoice === 'mergeSort') {
        // sortingVisualizerApp.array = mergeSortingAlgorithm.(sortingVisualizerApp.array);
        const swapMergeAnimation = mergeSortingAlgorithm.getMergeAnimation(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapMergeAnimation);
        $name.text(mergeSortingAlgorithm.name);
        $definition.text(mergeSortingAlgorithm.definition);
    } else if (userAlgoChoice === 'bubbleSort') {
        const swapBubbleAnimation = bubbleSortingAlgorithm.bubbleSort(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapBubbleAnimation);
        $name.text(bubbleSortingAlgorithm.name);
        $definition.text(bubbleSortingAlgorithm.definition);
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

            }, i * 200);

            console.log('barsOne and Two', barOne, barTwo);
        } else {
            setTimeout(() => {
                const [barOneIndex, newHeight] = animations[i];
                $(`.arrayBar${barOneIndex}`).css('height', `${newHeight}px`);
            }, i * 200);
        }
    }
}

const mergeSortingAlgorithm = {
    name: 'Merge Sort',
    definition: 'First divide the list into the smallest unit (1 element), then compare each element with the adjacent list to sort and merge the two adjacent lists. Finally all the elements are sorted and merged.',
    // returns the animation array that will be used to get sequence of the index that are being  swapped arrayBar
    getMergeAnimation: function (unsortedArr) {
        const animations = [];
        // first part of merge base case when the array 
        if (unsortedArr.length <= 1) {
            return unsortedArr;
        }
        // copy of the unsorted array 
        const auxilaryArry = unsortedArr.slice();
        mergeSortingAlgorithm.mergeSort(unsortedArr, 0, unsortedArr.length - 1, auxilaryArry, animations);
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
        mergeSortingAlgorithm.mergeSort(auxilaryArry, startIndex, middle, unsortedArr, animations);
        mergeSortingAlgorithm.mergeSort(auxilaryArry, middle + 1, endIndex, unsortedArr, animations);
        mergeSortingAlgorithm.merge(unsortedArr, startIndex, middle, endIndex, auxilaryArry, animations);

        // I have to change this to get index by index visuals 
        // let leftArr = unsortedArr.slice(0, middle);
        // let rightArr = unsortedArr.slice(middle);
        //mergeSortingAlgorithm.merge(mergeSortingAlgorithm.mergeSort(leftArr), mergeSortingAlgorithm.mergeSort(rightArr))
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

const bubbleSortingAlgorithm = {
    name: 'Bubble Sort',
    definition: 'Starting from the beginning of the list, compare every adjacent pair, swap their position if they are not in the right order (the latter one is smaller than the former one). After each iteration, one less element (the last one) is needed to be compared until there are no more elements left to be compared',
    bubbleSort: function (unsortedArr) {
        const animations = [];
        for (let i = 0; i < unsortedArr.length; i++) {
            for (let j = 0; j < unsortedArr.length; j++) {
                if (unsortedArr[j] > unsortedArr[j + 1]) {
                    animations.push([j, j + 1]);
                    animations.push([j, j + 1]);
                    animations.push([j, unsortedArr[j + 1]]);
                    animations.push([j + 1, j]);
                    animations.push([j + 1, j]);
                    animations.push([j + 1, unsortedArr[j]]);
                    let temp = unsortedArr[j];
                    unsortedArr[j] = unsortedArr[j + 1];
                    unsortedArr[j + 1] = temp;
                }
            }
        }
        return animations;
    }
}
$(document).ready(sortingVisualizerApp.init());