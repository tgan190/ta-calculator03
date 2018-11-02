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
        this.operand = '';
        this.operator = '+';
        this.result = 0;
        this.externalDisplayStr = '';
        this.history = [];
    
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
        }
    }

    handleClick(i) {

        var displayStr = this.state.displayStr;
        if (displayStr.length === 0) {
            this.result = 0;
        }
        
    
          switch (i) {
            case 0:
              this.calc.reset();
              this.setState({
                displayStr : ''
              });
           
              this.externalDisplayStr = '';
              this.result = 0;
              this.operand = '';
              this.operator = '+';
              this.history = [];
              break;
            case 1:
            
              if (displayStr.length === 0) {
                  this.calc.add(1);
                  this.operator = 'x';
                
              } else {
                  var len = displayStr.length;
                  if (!['+','-','x','/'].includes(displayStr.substring(len-1))) {
                    this.do_cal();
                    this.operator = 'x'
                  }
              }
                          
              this.externalDisplayStr = displayStr.concat('(');
              this.history.push({
                tmpResult: this.calc.equals(), tmpOperator: this.operator
                
              })
              
              this.setState({
                    displayStr: displayStr.concat('(')
              });
              this.operator = '+'
              this.operand = '';
              break;
            case 2:
             
              this.do_cal();
              this.operand = this.calc.equals();
              
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
              break;
            
            case 3:
              this.do_cal();
              this.operator = '+';
              this.operand = '';
              this.externalDisplayStr = displayStr.concat('+');
              this.setState({
                displayStr: displayStr.concat('+')
              });
              break;

            case 4:
              this.operand = this.operand.concat('7');
              this.externalDisplayStr = displayStr.concat('7');
              this.setState({
                displayStr: displayStr.concat('7')
              });
              break;

            case 5:
                this.operand = this.operand.concat('8');
                this.externalDisplayStr = displayStr.concat('8');
                this.setState({
                    displayStr: displayStr.concat('8')
                });
                break;
             
            case 6:
                this.operand = this.operand.concat('9');
                this.externalDisplayStr = displayStr.concat('9');
                this.setState({
                    displayStr: displayStr.concat('9')
                });
                break;
            
            case 7:
                this.do_cal();
                this.operator = '-';
                this.operand = '';
                this.externalDisplayStr = displayStr.concat('-');
                this.setState({
                    displayStr: displayStr.concat('-')
                });
                break;
            
            case 8:
                this.operand = this.operand.concat('4');
                this.externalDisplayStr = displayStr.concat('4');
                this.setState({
                    displayStr: displayStr.concat('4')
                });
                break;
            
            case 9:
                this.operand = this.operand.concat('5');
                this.externalDisplayStr = displayStr.concat('5');
                this.setState({
                    displayStr: displayStr.concat('5')
                });
                break;
            
            case 10:
                this.operand = this.operand.concat('6');
                this.externalDisplayStr = displayStr.concat('6');
                this.setState({
                    displayStr: displayStr.concat('6')
                });
                break;

            case 11:
                this.do_cal();
                this.operator = 'x';
                this.operand = '';
                this.externalDisplayStr = displayStr.concat('x');
                this.setState({
                    displayStr: displayStr.concat('x')
                });
                break;

            case 12:
                this.operand = this.operand.concat('1');
                this.externalDisplayStr = displayStr.concat('1');
                this.setState({
                    displayStr: displayStr.concat('1')
                });
                break;

            case 13:
                this.operand = this.operand.concat('2');
                this.externalDisplayStr = displayStr.concat('2');
                this.setState({
                    displayStr: displayStr.concat('2')
                });
                break;
            
            case 14:
                this.operand = this.operand.concat('3');
                this.externalDisplayStr = displayStr.concat('3');
                this.setState({
                    displayStr: displayStr.concat('3')
                });
                break;

            case 15:
                this.do_cal();
                this.operator = '/';
                this.operand = '';
                this.externalDisplayStr = displayStr.concat('/');
                this.setState({
                    displayStr: displayStr.concat('/')
                });
                break;

            case 16:
                this.operand = this.operand.concat('0');
                this.externalDisplayStr = displayStr.concat('0');
                this.setState({
                    displayStr: displayStr.concat('0')
                });
                break;
            
            case 17:
                this.operand = this.operand.concat('.');
                this.externalDisplayStr = displayStr.concat('.');
                this.setState({
                    displayStr: displayStr.concat('.')
                });
                break;
            
            case 18:
                this.do_cal();
                this.operator = '';
                this.operand = '';
                this.externalDisplayStr = displayStr.concat('=');
                this.result = this.calc.equals();
                this.history = [];

                this.setState({
                    displayStr: ''
                });
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