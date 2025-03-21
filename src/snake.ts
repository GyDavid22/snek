enum Direction {
    LEFT, RIGHT, UP, DOWN
}

class Snake {
    private static snakes: Snake[] = [];
    public static get numOfSnakes(): number {
        return Snake.snakes.length;
    }

    private cords: [number, number][];
    private direction: Direction;
    private newDirection: Direction | undefined;
    private subscribeCallback: ((e: KeyboardEvent) => void) | undefined;
    private interval: number | undefined;
    private currentSpeed: number;

    constructor() {
        if (Snake.numOfSnakes === 0) {
            clear();
        }
        Snake.snakes.push(this);
        updateScore(0);
        this.cords = [[Math.floor(SIZE[0] / 2), Math.floor(SIZE[1] / 2)]];
        this.direction = Direction.RIGHT;
        fillByCoordinate(this.cords[0][0], this.cords[0][1], SNAKE);
        this.placeFood();
        this.subscribe();
        this.currentSpeed = 50;
        this.createInterval();
    }

    private step() {
        if (this.newDirection !== undefined) {
            this.direction = this.newDirection;
            this.newDirection = undefined;
        }
        const first: [number, number] = [this.cords[0][0], this.cords[0][1]];
        switch (this.direction) {
            case Direction.LEFT:
                first[1] -= 1;
                if (first[1] === -1) {
                    first[1] = SIZE[1] - 1;
                }
                break;
            case Direction.RIGHT:
                first[1] += 1;
                if (first[1] === SIZE[1]) {
                    first[1] = 0;
                }
                break;
            case Direction.UP:
                first[0] -= 1;
                if (first[0] === -1) {
                    first[0] = SIZE[0] - 1;
                }
                break;
            case Direction.DOWN:
                first[0] += 1;
                if (first[0] === SIZE[0]) {
                    first[0] = 0;
                }
                break;
        }
        let grow = false;
        if (!isEmpty(first[0], first[1])) {
            if (elements[first[0]][first[1]].classList.contains(SNAKE)) {
                clearInterval(this.interval);
                this.interval = undefined;
                document.removeEventListener('keydown', this.subscribeCallback!);
                Snake.snakes.splice(0);
                return;
            }
            if (elements[first[0]][first[1]].classList.contains(FOOD)) {
                grow = true;
                empty(first[0], first[1]);
                fillByCoordinate(first[0], first[1], SNAKE);
                this.placeFood();
                updateScore(this.cords.length);
                if (this.currentSpeed > 0) {
                    this.currentSpeed -= 2;
                    this.createInterval();
                }
            }
        }
        if (!grow) {
            const last = this.cords.pop();
            empty(last![0], last![1]);
        }
        this.cords.unshift(first);
        fillByCoordinate(first[0], first[1], SNAKE);
    }

    private setDirection(d: Direction) {
        if (this.direction === d
            || (this.direction === Direction.LEFT && d === Direction.RIGHT)
            || (this.direction === Direction.RIGHT && d === Direction.LEFT)
            || (this.direction === Direction.UP && d === Direction.DOWN)
            || (this.direction === Direction.DOWN && d === Direction.UP)) {
            return;
        }
        this.newDirection = d;
    }

    private subscribe() {
        this.subscribeCallback = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.setDirection(Direction.UP);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setDirection(Direction.DOWN);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.setDirection(Direction.LEFT);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.setDirection(Direction.RIGHT);
                    break;
            }
        };
        document.addEventListener('keydown', this.subscribeCallback);
    }

    private placeFood() {
        fillByElement(emptyElements[Math.floor(Math.random() * emptyElements.length)], FOOD);
    }

    private createInterval() {
        if (this.interval !== undefined) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.step();
        }, this.currentSpeed);
    }
}