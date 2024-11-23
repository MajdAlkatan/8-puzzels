document.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const emptySpace = document.getElementById("empty-space");
    const shuffleButton = document.getElementById("shuffle-button");

    // Get initial positions for each tile in the grid
    let positions = [...Array(8).keys(), 8]; // Array from 0 to 8

    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1);
    }

    function swapTiles(index1, index2) {
        [positions[index1], positions[index2]] = [positions[index2], positions[index1]];
        renderTiles();
    }

    function renderTiles() {
        positions.forEach((tileIndex, gridIndex) => {
            if (tileIndex === 8) {
                emptySpace.style.order = gridIndex;
            } else {
                tiles[tileIndex].style.order = gridIndex;
            }
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            const tileIndex = positions.indexOf(index);
            const emptyIndex = positions.indexOf(8);
            if (isAdjacent(tileIndex, emptyIndex)) {
                swapTiles(tileIndex, emptyIndex);
            }
        });
    });

    function shuffleTiles() {
        do {
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }
        } while (!isSolvable());
        renderTiles();
    }

    function isSolvable() {
        let inversions = 0;
        for (let i = 0; i < positions.length - 1; i++) {
            for (let j = i + 1; j < positions.length - 1; j++) {
                if (positions[i] > positions[j]) inversions++;
            }
        }
        return inversions % 2 === 0;
    }

    shuffleButton.addEventListener("click", shuffleTiles);

    renderTiles();
});
