// 配置和狀態
const config = {
    minArraySize: 10,
    maxArraySize: 100,
    defaultSize: 30,
    minSpeed: 1,
    maxSpeed: 50,
    defaultSpeed: 25,
    baseDelay: 50,
};

const state = {
    array: [],
    arraySize: config.defaultSize,
    speed: config.defaultSpeed,
    sorting: false,
    sortingComplete: false,
    comparisons: 0,
    swaps: 0,
    startTime: 0,
    stopRequested: false,
};

// DOM 元素
const elements = {
    algorithmSelect: document.getElementById('algorithm'),
    arraySizeInput: document.getElementById('arraySize'),
    arraySizeValue: document.getElementById('arraySizeValue'),
    speedInput: document.getElementById('speed'),
    speedValue: document.getElementById('speedValue'),
    generateBtn: document.getElementById('generateBtn'),
    sortBtn: document.getElementById('sortBtn'),
    stopBtn: document.getElementById('stopBtn'),
    arrayContainer: document.getElementById('arrayContainer'),
    timeComplexity: document.getElementById('timeComplexity'),
    comparisons: document.getElementById('comparisons'),
    swaps: document.getElementById('swaps'),
    executionTime: document.getElementById('executionTime'),
};

// 演算法資訊
const algorithmInfo = {
    bubble: { time: 'O(n²)', space: 'O(1)' },
    quick: { time: 'O(n²)', space: 'O(log n)' },
    merge: { time: 'O(n log n)', space: 'O(n)' },
    selection: { time: 'O(n²)', space: 'O(1)' },
    insertion: { time: 'O(n²)', space: 'O(1)' },
};

// 輔助函數：延遲
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDelay() {
    // 速度越快，延遲越短
    // speed: 1 (慢) -> 50 (快)
    // delay: 200ms -> 2ms
    return Math.max(2, 200 - (state.speed * 3.8));
}

// 輔助函數：生成隨機數
function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 90) + 10); // 10-99
    }
    return array;
}

// 渲染陣列
function renderArray(array, comparisons = [], swaps = [], sortedIndices = []) {
    elements.arrayContainer.innerHTML = '';

    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${value}%`;
        bar.dataset.index = index;

        // 標記特殊狀態的條柱
        if (sortedIndices.includes(index)) {
            bar.classList.add('sorted');
        } else if (swaps.includes(index)) {
            bar.classList.add('swapping');
        } else if (comparisons.includes(index)) {
            bar.classList.add('comparing');
        }

        elements.arrayContainer.appendChild(bar);
    });
}

// 更新統計數據
function updateStats() {
    const elapsedTime = state.sorting ? Date.now() - state.startTime : 0;
    elements.comparisons.textContent = state.comparisons;
    elements.swaps.textContent = state.swaps;
    elements.executionTime.textContent = `${elapsedTime}ms`;
}

// 更新演算法資訊
function updateAlgorithmInfo() {
    const algorithm = elements.algorithmSelect.value;
    const info = algorithmInfo[algorithm];
    elements.timeComplexity.textContent = `時間: ${info.time} | 空間: ${info.space}`;
}

// 選擇排序
async function selectionSort() {
    const array = [...state.array];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        if (state.stopRequested) break;

        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (state.stopRequested) break;

            state.comparisons++;
            updateStats();

            renderArray(array, [minIndex, j]);

            await sleep(getDelay());

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            state.swaps++;
            renderArray(array, [], [i, minIndex]);
            await sleep(getDelay());
            updateStats();
        }

        renderArray(array, [], [], [0, i]);
    }

    if (!state.stopRequested) {
        state.sortingComplete = true;
        renderArray(array, [], [], Array.from({ length: n }, (_, i) => i));
    }

    state.sorting = false;
    state.stopRequested = false;
    updateButtonState();
}

// 氣泡排序
async function bubbleSort() {
    const array = [...state.array];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        if (state.stopRequested) break;

        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (state.stopRequested) break;

            state.comparisons++;
            updateStats();

            renderArray(array, [j, j + 1]);

            await sleep(getDelay());

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                state.swaps++;
                swapped = true;
                renderArray(array, [], [j, j + 1]);
                await sleep(getDelay());
                updateStats();
            }
        }

        renderArray(array, [], [], Array.from({ length: n - i }, (_, k) => k));

        if (!swapped) break;
    }

    if (!state.stopRequested) {
        state.sortingComplete = true;
        renderArray(array, [], [], Array.from({ length: n }, (_, i) => i));
    }

    state.sorting = false;
    state.stopRequested = false;
    updateButtonState();
}

// 快速排序
async function quickSort() {
    const array = [...state.array];
    await quickSortHelper(array, 0, array.length - 1);

    if (!state.stopRequested) {
        state.sortingComplete = true;
        renderArray(array, [], [], Array.from({ length: array.length }, (_, i) => i));
    }

    state.sorting = false;
    state.stopRequested = false;
    updateButtonState();
}

async function quickSortHelper(array, low, high) {
    if (low < high && !state.stopRequested) {
        const pi = await partition(array, low, high);
        await quickSortHelper(array, low, pi - 1);
        await quickSortHelper(array, pi + 1, high);
    }
}

async function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    renderArray(array, [high]);

    for (let j = low; j < high; j++) {
        if (state.stopRequested) break;

        state.comparisons++;
        updateStats();

        renderArray(array, [j, high]);

        await sleep(getDelay());

        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            state.swaps++;
            renderArray(array, [], [i, j]);
            await sleep(getDelay());
            updateStats();
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    state.swaps++;
    renderArray(array, [], [i + 1, high]);
    await sleep(getDelay());
    updateStats();

    return i + 1;
}

// 合併排序
async function mergeSort() {
    const array = [...state.array];
    await mergeSortHelper(array, 0, array.length - 1);

    if (!state.stopRequested) {
        state.sortingComplete = true;
        renderArray(array, [], [], Array.from({ length: array.length }, (_, i) => i));
    }

    state.sorting = false;
    state.stopRequested = false;
    updateButtonState();
}

async function mergeSortHelper(array, left, right) {
    if (left < right && !state.stopRequested) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(array, left, mid);
        await mergeSortHelper(array, mid + 1, right);
        await merge(array, left, mid, right);
    }
}

async function merge(array, left, mid, right) {
    const leftPart = array.slice(left, mid + 1);
    const rightPart = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length && !state.stopRequested) {
        state.comparisons++;
        updateStats();

        renderArray(array, [left + i, mid + 1 + j]);

        await sleep(getDelay());

        if (leftPart[i] <= rightPart[j]) {
            array[k] = leftPart[i];
            i++;
        } else {
            array[k] = rightPart[j];
            j++;
        }
        state.swaps++;
        renderArray(array, [], [k]);
        await sleep(getDelay());
        updateStats();
        k++;
    }

    while (i < leftPart.length && !state.stopRequested) {
        array[k] = leftPart[i];
        i++;
        k++;
        state.swaps++;
        renderArray(array, [], [k - 1]);
        await sleep(getDelay());
        updateStats();
    }

    while (j < rightPart.length && !state.stopRequested) {
        array[k] = rightPart[j];
        j++;
        k++;
        state.swaps++;
        renderArray(array, [], [k - 1]);
        await sleep(getDelay());
        updateStats();
    }
}

// 插入排序
async function insertionSort() {
    const array = [...state.array];
    const n = array.length;

    for (let i = 1; i < n; i++) {
        if (state.stopRequested) break;

        let key = array[i];
        let j = i - 1;

        renderArray(array, [i]);

        while (j >= 0 && array[j] > key) {
            if (state.stopRequested) break;

            state.comparisons++;
            updateStats();

            renderArray(array, [j, j + 1]);

            await sleep(getDelay());

            array[j + 1] = array[j];
            state.swaps++;
            renderArray(array, [], [j, j + 1]);
            await sleep(getDelay());
            updateStats();

            j--;
        }

        array[j + 1] = key;
        if (j + 1 !== i) {
            state.swaps++;
            renderArray(array, [], [j + 1]);
            await sleep(getDelay());
            updateStats();
        }

        renderArray(array, [], [], [0, i]);
    }

    if (!state.stopRequested) {
        state.sortingComplete = true;
        renderArray(array, [], [], Array.from({ length: n }, (_, i) => i));
    }

    state.sorting = false;
    state.stopRequested = false;
    updateButtonState();
}

// 主排序函數
async function startSort() {
    if (state.sorting || state.array.length === 0) return;

    state.sorting = true;
    state.sortingComplete = false;
    state.comparisons = 0;
    state.swaps = 0;
    state.stopRequested = false;
    state.startTime = Date.now();

    updateButtonState();

    const algorithm = elements.algorithmSelect.value;

    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'quick':
            await quickSort();
            break;
        case 'merge':
            await mergeSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
    }
}

// 生成陣列
function generateArray() {
    if (state.sorting) return;

    state.arraySize = parseInt(elements.arraySizeInput.value);
    state.array = generateRandomArray(state.arraySize);

    renderArray(state.array);
    updateStats();
    elements.timeComplexity.textContent = '-';

    state.sortingComplete = false;
    updateButtonState();
}

// 更新按鈕狀態
function updateButtonState() {
    elements.generateBtn.disabled = state.sorting;
    elements.sortBtn.disabled = state.sorting || state.array.length === 0;
    elements.stopBtn.disabled = !state.sorting;
}

// 事件監聽器
elements.arraySizeInput.addEventListener('input', () => {
    elements.arraySizeValue.textContent = elements.arraySizeInput.value;
});

elements.speedInput.addEventListener('input', () => {
    const speed = parseInt(elements.speedInput.value);
    elements.speedValue.textContent = speed <= 15 ? '慢' : speed <= 35 ? '中' : '快';
});

elements.generateBtn.addEventListener('click', () => {
    generateArray();
});

elements.sortBtn.addEventListener('click', startSort);

elements.stopBtn.addEventListener('click', () => {
    state.stopRequested = true;
    state.sorting = false;
    updateButtonState();
});

elements.algorithmSelect.addEventListener('change', () => {
    if (!state.sorting) {
        elements.timeComplexity.textContent = '-';
        updateStats();
    }
});

// 初始化
updateAlgorithmInfo();
generateArray();
