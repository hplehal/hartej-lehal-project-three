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
    });
}
// Create a function that checks the algorithm that the user chose.
sortingVisualizerApp.sortingAlgorithmCheck = function (userAlgoChoice) {
    if (userAlgoChoice === 'mergeSort') {

    }
}

sortingVisualizerApp.generateArrayBar = function (height) {
    $('.arrayGraph').append(`<div class="arrayBar arrayBar${height}"><div>`);
    $(`.arrayBar${height}`).css('height', `${height}px`);
    console.log('height', height);
}

sortingVisualizerApp.resetArray = function (arrayLength) {
    sortingVisualizerApp.array = [];
    let randomNumber = 0;
    $('.arrayGraph').empty();
    for (let i = 0; i < arrayLength; i++) {
        randomNumber = sortingVisualizerApp.randomNumber();
        console.log(randomNumber);
        sortingVisualizerApp.array.push(randomNumber);
        sortingVisualizerApp.generateArrayBar(randomNumber);
    }
}
// Create a method that generates a random number
sortingVisualizerApp.randomNumber = function () {
    return Math.floor(Math.random() * (400 - 6) + 5);
}

const sortingAlgorithms = {
    mergeSort: function () {

    },
}
$(document).ready(sortingVisualizerApp.init());