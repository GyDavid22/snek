const SIZE: readonly [number, number] = [70, 150];
const SNAKE = 'snake';
const FOOD = 'food';
const CLASSES: readonly string[] = [SNAKE, FOOD];

const elements: HTMLDivElement[][] = [];
const emptyElements: HTMLDivElement[] = [];
const scoreElement = document.getElementsByClassName('score')[0];

function initialize() {
    const container = document.getElementsByClassName('main-container')[0];
    for (let i = 0; i < SIZE[0]; i++) {
        const references: HTMLDivElement[] = [];
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < SIZE[1]; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            references.push(cell);
            row.appendChild(cell);
            emptyElements.push(cell);
        }
        elements.push(references);
        container.appendChild(row);
    }
    updateScore(0);
};

function empty(x: number, y: number) {
    elements[x][y].classList.remove(...CLASSES);
    emptyElements.push(elements[x][y]);
}

function isEmpty(x: number, y: number): boolean {
    return elements[x][y].classList.length === 1;
}

function fillByCoordinate(x: number, y: number, ...classNames: string[]) {
    emptyElements.splice(emptyElements.indexOf(elements[x][y]), 1);
    elements[x][y].classList.add(...classNames);
}

function fillByElement(element: HTMLDivElement, ...classNames: string[]) {
    emptyElements.splice(emptyElements.indexOf(element), 1);
    element.classList.add(...classNames);
}

function updateScore(score: number) {
    scoreElement.textContent = score.toString();
}

function clear() {
    for (let i = 0; i < SIZE[0]; i++) {
        for (let j = 0; j < SIZE[1]; j++) {
            elements[i][j].classList.remove(...CLASSES);
        }
    }
}
