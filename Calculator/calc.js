    let number_string = '0'
    let first_number = 0
    let second_number = 0
    let number = 0
    let dot_used = false
    let prev_op = ""
    let last_fn = ""

    // Handle Numbers, Decimals and PI
    function num_clicked(button) {

        if(last_fn == "result") {
            dot_used = false
            choosen_op = ""
            first_number = 0
            second_number = 0
            number_string = '0'
    
        }

        document.querySelector('.ac').innerText = "CE"

        if (number_string.length > 11) {
            return
        }

        if(button.textContent != '.' && button.textContent != 'π') {
            number_string += button.textContent
        }

        if (number_string=='00') {
            number_string = '0'
        }

        // To handle inputs like 05, 004
        if (number_string[0] == '0' && number_string[1] != '.' && number_string.length == 2) {
            number_string = number_string.slice(1);
        }

        if(dot_used==false && button.textContent == '.') {

            if(number_string == '') {
                number_string = '0' + button.textContent
            } 
            else {
            number_string += button.textContent
            }
            dot_used = true
        }

        if ((number_string=="" || number_string=="0") && (button.textContent == "π")) {
            number_string = Math.PI
        }

        document.getElementsByTagName('input')[0].value = number_string
        console.log(number_string)

        if (choosen_op == "") {
            first_number = number_string
            first_number = Number(first_number)
        }
        else {
            second_number = number_string
            second_number = Number(second_number)
        }

        last_fn = "num_clicked"
    }

    let choosen_op = ''

    // Handle Operators : +,-,/,*,^
    function operator_clicked(operator) {

        dot_used = false

        // To Handle inputs like: 5+3=-2=+1
        if(last_fn == "result") {
            // This returns string, not a number
            first_number = document.querySelector("input").value
            first_number = Number(first_number)
            second_number = 0
            number_string = ''
        }
        // To Handle input like 5+2-1...
        if (second_number != 0) {
            result()
        }

        if (number_string != '' || choosen_op != '') {
            number_string = ''
            if (operator.textContent == '+') {
                choosen_op = '+'
            }
            if (operator.textContent == '-') {
                choosen_op = '-'
            }
            if (operator.textContent == '÷') {
                choosen_op = '/'
            }
            if (operator.textContent == 'x') {
                choosen_op = '*'
            }
            if (operator.textContent.trim() == "Xy")
                choosen_op = "**"
        }

        last_fn = "operator_clicked"

    }
    // Handle Square Root
    function sq_clicked() {

        result_value = document.querySelector('input').value
        result_value = result_value ** 0.5
        first_number = result_value

        first_number = String(first_number)
        if(first_number.length > 12 && first_number.includes('.')) {
            let [intPart, decPart] = first_number.split('.')

            let allowedDeclength = 12-(intPart.length)-1
            first_number = intPart+'.'+ decPart.slice(0,allowedDeclength)
        }
        first_number = Number(first_number)
        document.querySelector("input").value = first_number

        last_fn = 'sq_clicked'
    }
    // To Handle Percent
    function percent_clicked() {

        input_value = document.querySelector('input').value
        result_value = input_value/100
        number = result_value
        document.querySelector('input').value = number

        str_number = String(number)
        if(str_number.length > 12 && str_number.includes('.')) {
            let [intPart, decPart] = str_number.split('.')

            let allowedDeclength = 12-(intPart.length)-1
            number = intPart+'.'+ decPart.slice(0,allowedDeclength)
            }

        if (choosen_op == '' || last_fn == 'result') {
            first_number = number
            second_number = 0
                    
        } else {
            second_number = number
        }
        
            document.querySelector('input')
            number_string = String(first_number)
                    
                    last_fn = 'percent_clicked'
        }

    // Handle Negate
    function negate_clicked() {
        number = document.querySelector("input").value
        number = Number(number)
        number = -1*number
        document.querySelector("input").value = number

        if(second_number != 0) {
            second_number = second_number * -1
        } else {
            first_number = first_number * -1
        }
        last_fn = 'negate_clicked'
    }

    // To Handle Round-off : R0 and R2
    function round_off(btn) {
        if(btn.textContent == 'R0') {
            number = document.querySelector('input').value
            if(number.includes('.')) {
                let [intPart,decPart] = number.split('.')
                document.querySelector('input').value = intPart
                intPart = Number(intPart)
                number = intPart

            if (choosen_op == '' || last_fn == 'result') {
                first_number = number
                second_number = 0
                    
            } else {
                second_number = number
            }
                number_string = document.querySelector('input').value
            } 
        } 
        if (btn.textContent == 'R2') {
            number = document.querySelector('input').value
            if (!number.includes('.')) {
                number = number + '.00'
            }
            if (number.includes('.')) {
                let [intPart, decPart] = number.split('.')
                if (decPart.length > 2) {
                    decPart = decPart.slice(0,2)
                    number = intPart + '.' +decPart
                } 
                else if (decPart.length == 1) {
                    decPart = decPart + '0'
                    number = intPart +'.' +decPart
                }
            }
            document.querySelector('input').value = number
            number = Number(number)
            if (choosen_op == '' || last_fn == 'result') {
                first_number = number
                second_number = 0
                    
            } else {
                second_number = number
            }
            number_string = document.querySelector('input').value
        }
        last_fn = 'round_off'
    }


    // Handle Memory Stuffs: mc, mr, m-, m+
    let memory = 0
    function memory_clicked(button) {
        if(button.textContent == 'mc') {
            memory =0
        }
        if (button.textContent == 'mr') {
            if (choosen_op == '' || last_fn == 'result') {
                first_number = memory
                second_number = 0
                    
            } else {
                second_number = memory
            }
            number_string = String(memory)
            document.querySelector('input').value = memory
        }
        if (button.textContent == 'm-') {
            number = document.querySelector('input').value
            number = Number(number)
            memory = memory-number

            if (last_fn == 'result') {
                first_number = memory
                second_number = 0
                number_string = ''
            }
        }
        if (button.textContent == 'm+') {
            number = document.querySelector('input').value
            number = Number(number)
            memory= memory+number

            if (last_fn == 'result') {
                first_number = memory
                second_number = 0
                number_string = ''

            }
        }
        last_fn = 'memory_clicked'
    }

    
    // Handle Result
    let result_value = 0
    function result() {

        document.querySelector('.ac').innerText = "AC"
        dot_used = false
        if(choosen_op != '') {
                if(choosen_op == '+') {
                    result_value = first_number + second_number
                }
                if(choosen_op == '-') {
                    result_value = first_number - second_number
                }
                if(choosen_op == '*') {
                    result_value = first_number * second_number
                }
                if(choosen_op == '/') {
                    result_value = first_number / second_number
                }
                if(choosen_op == '**') {
                    result_value = first_number ** second_number
                }

                first_number = result_value
            } else {
                first_number = document.querySelector('input').value
            }

                first_number = String(first_number)
                if (first_number.length > 12 ) {
                    if (!first_number.includes('.')) {
                        first_number = 'Infinity'
                    }
                    else {
                        let [intPart, decPart] = first_number.split('.')
                        if (intPart.length > 12) {
                            first_number = 'Infinity'
                        }
                        else {
                        let allowedDeclength = 12-(intPart.length)-1
                        first_number = intPart+'.'+ decPart.slice(0,allowedDeclength)
                        }
                    }

                }
                first_number = Number(first_number)
                
            
                number_string = ''
                document.getElementsByTagName('input')[0].value = first_number

                last_fn = 'result'

    }

    // Handle AC and CE
    function ac_clicked(button) {
        if (button.textContent == 'AC') {
            dot_used = false
            choosen_op = ''
            first_number = 0
            second_number = 0
            number_string = '0'
            document.getElementsByTagName('input')[0].value = number_string
        } 
        else {
            number_string = '0'
            document.getElementsByTagName('input')[0].value = number_string   
            document.querySelector('.ac').innerText = 'AC'       
        }

        last_fn = 'ac_clicked'
    } 