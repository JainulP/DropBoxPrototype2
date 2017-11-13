/*
 * Calculator.cpp
 *
 *  Created on: Oct 30, 2017
 *      Author: manasa
 */

#include <iostream>
#include "Calculator.h"

using namespace std;

Calculator::Calculator() {
	bracket_count = 0;
	// TODO Auto-generated constructor stub

}

Calculator::~Calculator() {
	// TODO Auto-generated destructor stub
}
/*
 * expression function calls the term and checks if the current char is
 *  addition or subtraction and does the corresponding action
 *
 */
double Calculator::expression()  throw (string) {
	char ch;
	double value;
	//return the value of the term
	value = term();
	cin >> ws;
	ch = cin.peek();
	//addition operation
	if (ch == '+') {
		cin >> ch;
		value = value + term();
	}
	//subtraction operation
	if (ch == '-') {
		cin >> ch;
		value = value - term();
	}
	return value;
}
/*
 * Term does the division or multiplication or returns the number ,
 * if factor return operand
 *
 */
double Calculator::term() throw (string) {
	double value;
	value = factor();
	cin >> ws;
	char ch;
	ch = cin.peek();
	//division operation
	if (ch == '/') {
		cin >> ch;
		double value_temp = factor();
		if (value_temp != 0)
			value = value / value_temp;
		else
			throw string("Division by zero");
	}
	//multiplication operation
	if (ch == '*') {
		cin >> ch;
		value = value * factor();
	}
	return value;
}
/*
 *Factor return the operand if it is digit . If bracket is encountered,
 * it calls expression to evaluate the operations in bracket
 */
double Calculator::factor() throw (string) {
	double value = 0;
	char ch;
	cin >> ws;
	ch = cin.peek();
	//return the operand if a digit is encounetred
	if (isdigit(ch)) {
		double temp;
		cin >> temp;
		return temp;
	} else {
		// call the expression which will evalaute the expression in bracket
		if (ch == '(') {
			bracket_count++;
			cin >> ch;
			value = expression();
			ch = cin.peek();
			if (ch == ')') {
				bracket_count--;
				cin >> ch;
			} else {
				throw string("Missing )");
			}
		}
		return value;
	}
}
