class Game {
    table = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    current = 'x';
    rules = {
        '[0,1,2]': true, // horizontais
        '[0,0,0]': true, // vertical coluna 1
        '[1,1,1]': true, // vertical coluna 2
        '[2,2,2]': true, // vertical coluna 3
        '[0,1,2]': true, // inclina 1
        '[2,1,0]': true // inclinado 2
    }

    initGame(){
        const app = document.getElementById('app');

        this.table.forEach((line, collumm) => {
            const divide = this.createElement('div');
            line.forEach((values, index) => {
                const button = this.createElement('button');
                button.innerHTML = values;
                button.addEventListener('click', () => {
                    this.table[collumm][index] = this.current;
                    this.updateField(button);
                })
                divide.appendChild(button)
                app.appendChild(divide);
            })
        })
    }

    createElement(type){
        return document.createElement(type);
    }

    updateField(field) {
        field.innerHTML = this.current;
        field.setAttribute('class', `char-${this.current}`);
        this.changeNextPlayer();
    }

    changeNextPlayer(){
        const player = document.querySelector('#player');
        this.statusGame();
        this.current = this.current === 'x' ? 'o' : 'x';
        player.innerHTML = this.current;
        player.setAttribute('class', `char-${this.current}`)

    }

    compare(lineChecked) {
        const widInLine = this.rules[JSON.stringify(lineChecked)];
        console.log('LINE',lineChecked)
        if(widInLine) {
            if(confirm('ganhou FDP!')){
                location.reload();
            }
        }
    }

    statusGame() {
        let lineChecked = [];
        let colunmnChecked = []
        this.table.forEach((table, tbIndex) => {
            if(table.includes(this.current)){
                table.forEach((el, index) => {
                    if(this.current === el) {
                        lineChecked.push(index)

                        if(index === tbIndex) {
                            colunmnChecked.push(tbIndex);
                            console.log(index, tbIndex)
                            if(tbIndex === 2) {
                                this.compare(colunmnChecked)
                                colunmnChecked = []
                            }
                        }
                    }
                });
                this.compare(lineChecked);
            }
            lineChecked = []
        })
        
    }
}
new Game().initGame();