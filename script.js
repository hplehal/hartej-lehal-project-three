// namespacing 
const sortingVisualizerApp = {
    animationSpeed: 0,
    arrayLength: '',
    array: [],
    sortingAlgo: 'hello',
};

// ⏬ Create an init method
sortingVisualizerApp.init = function () {
    $('#arrayLength').on('change', function () {
        $('.lengthOnChange').text(this.value);
        console.log(this.value);
    })

    sortingVisualizerApp.appDisplay();
    $('form').on('submit', function (e) {
        sortingVisualizerApp.smoothScroll();
        $('button').attr('disabled', true);
        e.preventDefault();
        sortingVisualizerApp.sortingAlgo = $('#algorithms option:selected').val();

        sortingVisualizerApp.animationSpeed = $('#timeDelay').val();
        sortingVisualizerApp.arrayLength = $('#arrayLength').val();
        sortingVisualizerApp.resetArray(sortingVisualizerApp.arrayLength);
        sortingVisualizerApp.sortingAlgorithmCheck(sortingVisualizerApp.sortingAlgo);
    });
}

sortingVisualizerApp.appDisplay = function () {
    let desktop = 1200;
    let screenWidth = $(window).width();
    if (screenWidth <= desktop) {
        $('#arrayLength').attr('max', 30);
    }
}

sortingVisualizerApp.smoothScroll = () => {
    $("html").animate(
        {
            scrollTop: $("section").offset().top,
        },
        1500
    );
};

// ⏬ Create a function that checks the algorithm that the user chose.
sortingVisualizerApp.sortingAlgorithmCheck = function (userAlgoChoice) {
    let $name = $('.sortingName');
    let $definition = $('.sortingDefinition');
    if (userAlgoChoice === 'mergeSort') {
        const swapMergeAnimation = sortingVisualizerApp.mergeSortingAlgorithm.getMergeAnimation(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapMergeAnimation);

        $name.text(sortingVisualizerApp.mergeSortingAlgorithm.name);
        $definition.text(sortingVisualizerApp.mergeSortingAlgorithm.definition);
    } else if (userAlgoChoice === 'bubbleSort') {
        const swapBubbleAnimation = sortingVisualizerApp.bubbleSortingAlgorithm.bubbleSort(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapBubbleAnimation);

        $name.text(sortingVisualizerApp.bubbleSortingAlgorithm.name);
        $definition.text(sortingVisualizerApp.bubbleSortingAlgorithm.definition);
    } else if (userAlgoChoice === 'quickSort') {
        const swapQuickAnimation = sortingVisualizerApp.quickSortingAlgorithm.getQuicksortAnimation(sortingVisualizerApp.array);
        sortingVisualizerApp.swapBars(swapQuickAnimation);

        $name.text(sortingVisualizerApp.quickSortingAlgorithm.name);
        $definition.text(sortingVisualizerApp.quickSortingAlgorithm.definition);
    }
}

// ⏬ Create a function that generates (appends) the random bar form the graph 
sortingVisualizerApp.generateArrayBar = function (height, index) {
    $('.arrayGraph').append(`<div class="arrayBar arrayBar${index}"><div>`);
    $(`.arrayBar${index}`).css('height', `${height}px`);
}

//⏬ Create a funcction that resets the array 
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

// ⏬ Create a method that generates a random number
sortingVisualizerApp.randomNumber = function () {
    return Math.floor(Math.random() * (400 - 6) + 5);
}

// ⏬ I got a little help from this 🙏🏽🙏🏽🙏🏽 https://www.youtube.com/watch?v=pFXYym4Wbkc&feature=youtu.be   
//with the idea of creating a sequence array to get the swapBars to work. 
// Function will change the bar color to red when swap is taking place. 
// in the animations array inside every 3rd index ther is an array that stores the index and the number(height).
// hence i am using mod 3 !== 2 to change the color which animations array contains 
// the rest will be changing height.

sortingVisualizerApp.swapBars = function (animations) {
    for (let i = 0; i < animations.length; i++) {
        // check if i is not the every 3rd item in the array then cache true
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const barOne = animations[i][0];
            const barTwo = animations[i][1]
            setTimeout(() => {
                if (i % 3 === 0) {
                    $(`.arrayBar${barOne}`).css('background-color', '#EB1F1F');
                    $(`.arrayBar${barTwo}`).css('background-color', '#EB1F1F');
                } else {
                    $(`.arrayBar${barOne}`).css('background-color', '#FED606');
                    $(`.arrayBar${barTwo}`).css('background-color', '#FED606');
                }
            }, i * sortingVisualizerApp.animationSpeed);
        } else {
            setTimeout(() => {
                const barIndex = animations[i][0];
                const newHeight = animations[i][1];
                $(`.arrayBar${barIndex}`).css('height', `${newHeight}px`);
                if (i === animations.length - 1) {
                    $('button').attr('disabled', false);
                }
            }, i * sortingVisualizerApp.animationSpeed);
        }
    }
}

// WELCOME TO JUMANJI!
// created an isolated object for mergeSortAlgorithm 
sortingVisualizerApp.mergeSortingAlgorithm = {
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
        sortingVisualizerApp.mergeSortingAlgorithm.mergeSort(unsortedArr, 0, unsortedArr.length - 1, auxilaryArry, animations);
        return animations;
    },
    // recursively call the mergeSort function but divide them into two calls where it will be divided in the middle
    // call merge to actually sort the function 
    mergeSort: function (unsortedArr, startIndex, endIndex, auxilaryArry, animations) {
        if (startIndex === endIndex) {
            return;
        }
        let middle = Math.floor((startIndex + endIndex) / 2);

        // recursively call mergeSort and after call merge
        this.mergeSort(auxilaryArry, startIndex, middle, unsortedArr, animations);
        this.mergeSort(auxilaryArry, middle + 1, endIndex, unsortedArr, animations);
        sortingVisualizerApp.mergeSortingAlgorithm.merge(unsortedArr, startIndex, middle, endIndex, auxilaryArry, animations);

    },
    // create a function that will divide the array to two equally divided parts 
    // it
    merge: function (unsortedArr, start, middle, end, auxilaryArry, animations) {

        let leftIndex = start;
        let rightIndex = start;
        let middleIndex = middle + 1;

        while (leftIndex <= middle && middleIndex <= end) {
            animations.push([leftIndex, middleIndex]);
            animations.push([leftIndex, middleIndex]);
            if (auxilaryArry[leftIndex] <= auxilaryArry[middleIndex]) {
                animations.push([rightIndex, auxilaryArry[leftIndex]]);
                unsortedArr[rightIndex++] = auxilaryArry[leftIndex++];
            } else {
                animations.push([rightIndex, auxilaryArry[middleIndex]]);
                unsortedArr[rightIndex++] = auxilaryArry[middleIndex++];
            }
        }
        // this will check if the division is not equal it will go through this 
        while (leftIndex <= middle) {
            animations.push([leftIndex, leftIndex]);
            animations.push([leftIndex, leftIndex]);
            animations.push([rightIndex, auxilaryArry[leftIndex]]);
            unsortedArr[rightIndex++] = auxilaryArry[leftIndex++];
        }

        while (middleIndex <= end) {
            console.log(middleIndex)
            animations.push([middleIndex, middleIndex]);
            animations.push([middleIndex, middleIndex]);
            animations.push([rightIndex, auxilaryArry[middleIndex]]);
            unsortedArr[rightIndex++] = auxilaryArry[middleIndex++];
        }
    }
}

// created an isolated object for bubbleSortAlgorithm
// https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
sortingVisualizerApp.bubbleSortingAlgorithm = {
    name: 'Bubble Sort',
    definition: 'Starting from the beginning of the list, compare every adjacent pair, swap their position if they are not in the right order (the latter one is smaller than the former one). After each iteration, one less element (the last one) is needed to be compared until there are no more elements left to be compared',
    //    compare all the pairs, swap their position if the index + 1 is smaller than index
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

// created an isolated object for quickSortAlgorithm
// https://www.geeksforgeeks.org/quick-sort/
sortingVisualizerApp.quickSortingAlgorithm = {
    name: 'Quick Sort',
    definition: 'Quick Sort is a divide and conquer algorithm just like Merge Sort. It creates two empty arrays to hold elements less than the pivot value and elements greater than the pivot value, and then recursively sort the sub arrays. There are two basic operations in the algorithm, swapping items in place and partitioning a section of the array.',
    getQuicksortAnimation: function (unsortedArr) {
        const animations = [];
        if (unsortedArr.length <= 1) {
            return unsortedArr;
        }
        sortingVisualizerApp.quickSortingAlgorithm.quickSort(unsortedArr, 0, unsortedArr.length - 1, animations);
        console.log(animations);
        return animations;

    },

    quickSort: function (unsortedArr, start, end, animations) {
        if (start < end) {
            let partitionIndex = sortingVisualizerApp.quickSortingAlgorithm.partition(unsortedArr, start, end, animations);
            this.quickSort(unsortedArr, start, partitionIndex - 1, animations);
            this.quickSort(unsortedArr, partitionIndex + 1, end, animations);
        }
    },

    // This function takes last element as pivot, places
    // the pivot element at its correct position in sorted
    // array, and places all smaller(smaller than pivot)
    // to left of pivot and all greater elements to right
    // of pivot
    partition: function (unsortedArr, start, end, animations) {
        let pivot = unsortedArr[end];
        let temp = 0;
        let i = start - 1;
        for (let j = start; j <= end; j++) {
            if (unsortedArr[j] < pivot) {
                i++;
                animations.push([i, j]);
                animations.push([i, j]);
                animations.push([i, unsortedArr[j]])
                animations.push([j, i]);
                animations.push([j, i]);
                animations.push([j, unsortedArr[i]])
                temp = unsortedArr[i];
                unsortedArr[i] = unsortedArr[j];
                unsortedArr[j] = temp;
            }
        }
        i++;
        animations.push([i, end]);
        animations.push([i, end]);
        animations.push([i, unsortedArr[end]])
        animations.push([end, i]);
        animations.push([end, i]);
        animations.push([end, unsortedArr[i]])
        temp = unsortedArr[i];
        unsortedArr[i] = unsortedArr[end];
        unsortedArr[end] = temp;

        return i;
    }
}
$(document).ready(sortingVisualizerApp.init());