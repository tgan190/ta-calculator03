import React from 'react';
import Calc from'../calc';
import KeyPad from './KeyPad';
import CalcDisplay from './CalcDisplay';

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayStr: ''
        };

        this.squares = ['C', '(',')', '+',
        '7', '8', '9', '-',
        '4', '5', '6', 'x',
        '1', '2', '3', '/',
        '0', '.', '=']

        this.calc = new Calc();

        this.initializeVar();
    
    }

    initializeVar () {
        this.operand = '';
        this.operator = '+';
        this.result = 0;
        this.externalDisplayStr = '';
        this.history = [];
        this.openB = 0;
    }

    do_cal() {
        
        if(this.operand) {
            var operandStr = this.operand;
            var operand = Number(operandStr);
            if (!this.operator) {
                this.calc.add(operand);
            } else {
                if (this.operator === '+') {
                  this.calc.add(operand);      
                } else if (this.operator === '-') {
                  this.calc.subtract(operand);           
                } else if (this.operator === 'x') {
                   this.calc.multiply(operand);    
                } else if (this.operator === '/') {
                    this.calc.divide(operand);
                }
            }
            this.result = this.calc.getResult();
        }

    }

    operandFn (digitStr, displayStr) {
          if (!displayStr) {
            this.result = 0;
            if (digitStr === '.') {
                this.operand = '0';
            } else {
                this.operand = '';
            }
          }
          this.operand = this.operand.concat(digitStr);
          this.externalDisplayStr = displayStr.concat(digitStr);
          this.setState({
            displayStr: displayStr.concat(digitStr)
          });
    }

    operatorFn (operatorStr, displayStr) {
        if (this.operand) {
          this.do_cal();
          this.operand = '';
        }
        this.operator = operatorStr;        
        this.externalDisplayStr = displayStr.concat(operatorStr);
        this.setState({
          displayStr: displayStr.concat(operatorStr)
        });
    }

    handleClick(i) {

        var displayStr = this.state.displayStr;      
    
          switch (i) {
            case 0:
              this.calc.reset();
              this.setState({
                displayStr : ''
              });
           
              this.initializeVar();
             
              break;

            case 1:
              if (!displayStr) {
                  this.calc.add(1);
                  this.operator = 'x';
                  this.result = 0;
                
              } else {
                  var len = displayStr.length;
                  
                  if (!['+','-','x','/'].includes(displayStr.substring(len-1))) {
                    this.do_cal();
                    this.operator = 'x'
                  }
              }
                          
              if (displayStr.substring(len-1) === '(') {
                  this.history.push({
                    tmpResult: 1, tmpOperator: 'x'
                  })
              }  else {
                    this.history.push({
                    tmpResult: this.calc.equals(), tmpOperator: this.operator
                  })
              }
             
              this.externalDisplayStr = displayStr.concat('(');
              this.setState({
                    displayStr: displayStr.concat('(')
              });
              this.operator = '+'
              this.operand = '';
              this.openB++; 
              break;

            case 2:
              
              if (this.openB > 0 ) {
                this.do_cal();
                // this.operand = this.calc.equals();
                this.operand = this.calc.equals().toString();                
                const current = this.history.pop();
                var tmpResult = current.tmpResult;
                this.calc.add(tmpResult);
                this.operator = current.tmpOperator;
                this.do_cal();
                this.operand = '';
                this.operator = '';        
                this.externalDisplayStr = displayStr.concat(')');
                this.setState({
                        displayStr: displayStr.concat(')')
                });
                this.openB--;
              }
              // ignore any extra close brackets
              break;
            
            case 3:
              this.operatorFn('+', displayStr);         
              break;

            case 4:
              this.operandFn('7', displayStr);             
              break;

            case 5:         
                this.operandFn('8', displayStr);
                break;
             
            case 6:
                this.operandFn('9', displayStr);
                break;
            
            case 7:
                this.operatorFn('-', displayStr);
                break;
            
            case 8:
                this.operandFn('4', displayStr);
                break;
            
            case 9:
                this.operandFn('5', displayStr);                
                break;
            
            case 10:
                this.operandFn('6', displayStr);                
                break;

            case 11:
                this.operatorFn('x', displayStr);
                // otherwise ignore the operator
                break;

            case 12:
                this.operandFn('1', displayStr);
                break;

            case 13:
                this.operandFn('2', displayStr);
                break;
            
            case 14:
                this.operandFn('3', displayStr);
                break;

            case 15:
                this.operatorFn('/', displayStr);
                // otherwise ignore the operator
                break;

            case 16:
                this.operandFn('0', displayStr);
                break;
            
            case 17:
                this.operandFn('.', displayStr);
                break;
            
            case 18:
                this.do_cal();            
                this.externalDisplayStr = displayStr.concat('=');
                this.result = this.calc.equals();
                // this.operand = '';
                this.operand = this.result.toString();
                this.operator = '+';
                this.history = [];
                this.setState({
                    displayStr: ''
                });
                this.openB = 0;
                break;
            default:
        }
    }

    render() {
  
        return (
          <div className="calculator">
            <CalcDisplay 
                externalDisplayStr = {this.externalDisplayStr}
                result = {this.result}/>

            <div>
              <KeyPad 
                squares={this.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            
          </div>
        );
    }
}

export default Calculator;