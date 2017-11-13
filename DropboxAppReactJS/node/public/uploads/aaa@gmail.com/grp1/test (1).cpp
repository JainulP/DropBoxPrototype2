/*
 * test.cpp
 *
 *  Created on: Oct 30, 2017
 *      Author: manasa
 */

#include <iostream>
#include <stdlib.h>
#include "Calculator.h"

using namespace std;

int main() {
	Calculator calculator;
	char ch;
	string extra;
	calculator.bracket_count = 0;
	cout << "Expression? ";
	cin >> ws;
	ch = cin.peek();
	// check if the char is ., end the computation else
	while (ch != '.') {
		try {

			// call the mutual recursive function to calculate the expression
			double result = calculator.expression();
			ch = cin.peek();
			cout << result << endl;
			ch = cin.peek();
			if (ch == '%') {
				throw string("Unexpected %");
			} else if (ch == ')') {
				throw string("Unexpected )");
			}

		} catch (string& msg) {
			cout << "***** " << msg << endl;
		}
		// read all blanks, and other characters in case of other operators like %
		getline(cin, extra);
		// get the next input character for the expression
		//calculator.bracket_count = 0;
		cout << "Expression? ";
		cin >> ws;
		ch = cin.peek();
	}
	//print done
	cout << endl;
	cout << endl;
	cout << "Done!" << endl;
	return 0;
}
