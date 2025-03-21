(() => {
    try {
        initialize();
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    if (Snake.numOfSnakes === 1) {
                        return;
                    }
                    new Snake();
                    break;
            }
        });
    } catch (e) {
        console.error(e);
        alert('I crashed, sorry :(');
    }
})();
