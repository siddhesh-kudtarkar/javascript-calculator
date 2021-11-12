$(document).ready(() => {

    let expression = [];
    let currentNumber = "";
    let mathExp = [];

    let keyMappings = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "add": "+",
        "subtract": "-",
        "multiply": "*",
        "divide": "/",
        "equals": "=",
        "decimal": "."
    };

    $("#clear").click(() => {
        $("#display").html("0");
        $("#expression").html("");
        expression = [];
        mathExp = [];
        currentNumber = "";
    })

    try {
        for (let key of Object.keys(keyMappings)) {
            let digitRegex = new RegExp(/^\d$/g);
            let operatorRegex = new RegExp(/^[+/*-]$/g);
    
            if (digitRegex.test(keyMappings[key])) {
                $("#" + key).click(() => {
                    currentNumber += keyMappings[key];
                    currentNumber = parseFloat(currentNumber).toString()
                    expression.push(keyMappings[key]);

                    if (digitRegex.test(expression[expression.length - 1]))
                        $("#display").html(expression.join(""));
                    else
                        $("#display").html(parseFloat(currentNumber).toString());
                    $("#expression").html(expression.join(""));
                });
                
            } else {
                if (key == "equals") {
                    $("#equals").click(() => {
                        let number = [];
                        for (let i = expression.length - 1; i >= 0; i--) {
                            if (operatorRegex.test(expression[i]))
                                break;
                            else
                                number.unshift(expression[i]);
                        }

                        mathExp.push(parseFloat(number.join("")).toString());

                        let result = parseFloat(eval(mathExp.join(""))).toString();

                        $("#display").html(result);
                        $("#expression").html(expression.join("") + "=" + result);

                        mathExp.splice(mathExp.length - 1, 1);

                        currentNumber = result;
                        expression = [result];
                        mathExp = [];
                    });
                } else if (key == "decimal") {
                    $("#decimal").click(() => {
                        if (currentNumber.indexOf(".") == -1 && currentNumber.length > 0) {
                            currentNumber += keyMappings[key];
                            expression.push(keyMappings[key]);
                        }

                        $("#display").html(currentNumber);
                        $("#expression").html(expression.join(""));
                    });
                } else {
                    $("#" + key).click(() => {
                        if (operatorRegex.test(expression[expression.length - 1])) {
                            if (key == "subtract")
                                mathExp.push(keyMappings[key]);
                            else
                                mathExp[mathExp.length - 1] = keyMappings[key];

                            expression.push(keyMappings[key]);
                        } else if (currentNumber.length > 0 && !operatorRegex.test(expression[expression.length - 1])) {
                            mathExp.push(parseFloat(currentNumber).toString());
                            currentNumber = "";
                            mathExp.push(keyMappings[key]);
                            expression.push(keyMappings[key]);
                        }

                        $("#display").html(keyMappings[key]);
                        $("#expression").html(expression.join(""));
                    });
                }
            }
        }

        $(document).keypress(function(event) {
            let keyCode = (event.keyCode ? event.keyCode : event.which);

            let keyCodeMappings = {
                "13": "equals",
                "42": "multiply",
                "43": "add",
                "45": "subtract",
                "46": "decimal",
                "47": "divide",
                "48": "zero",
                "49": "one",
                "50": "two",
                "51": "three",
                "52": "four",
                "53": "five",
                "54": "six",
                "55": "seven",
                "56": "eight",
                "57": "nine",
                "61": "equals",
                "88": "multiply",
                "120": "multiply"
            };

            if (keyCodeMappings.hasOwnProperty(keyCode))
                $("#" + keyCodeMappings[keyCode]).click();
        })
    } catch(e) {
        window.alert('Enter a valid expression.');
    }

});