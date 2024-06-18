function Calculator() {
    this.display = document.getElementById('output');

    this.parenthesesIsValid = false;

    this.result = () => {
        try {
            const calc = this.display.innerText;
            this.display.innerText = Function(`return ${calc}`)();
        } catch(e) {
            alert('Erro de expressão');
            this.display.innerText = '';
        }
    }

    this.actions = function(act) {
        const action = {
            'C': function() {
                this.display.innerText = '';
            }.bind(this),

            '()': function() {
                if (this.parenthesesIsValid) {
                    this.display.innerText += ')';
                    this.parenthesesIsValid = false;
                } else {
                    this.display.innerText += '(';
                    this.parenthesesIsValid = true;
                }
            }.bind(this),
            '=': function() {
                this.result();
            }.bind(this)
        }

        if (action[act]) return action[act]();

        this.display.innerText += act;
    }

    this.events = () => { 
        document.querySelector('.containerButtons').addEventListener('click', e => {
            const btn =  e.target;
           
            if (!(btn.localName === 'button')) return;
           
            this.actions(btn.value);
        });
    }

    this.init = () => {
        this.events();
    }
}

const calculator = new Calculator();
calculator.init();