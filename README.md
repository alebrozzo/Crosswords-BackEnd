This is the back end project for a crosswords creation application. In the front end, the user indicates the horizontal and vertical sizes, and places black boxes on the puzzle. Then the user requests the back end (this project) for a list of horizontal and vertical words that can fit in the crossword, and their definitions.

This project is build using Node (see caveat below) and Express.

CAVEAT: I understand that NodeJS is not the best environment for implementing this type of application (little IO/net, much CPU). However, the intent of this project is to improve my javascript / node skills,
which is why I am creating a more "logic intensive" than "UI/UX intensive" app

Completed tasks:

* Create an empty structure of height and length defined by the user
* Set the word numbering by finding where a word starts and the length it should have, and fill two arrays (one for horizontal and one for vertical words) with that information, and placeholders for words and definitions to be set once the puzzle is created
* Load a dictionary (a word list actually) asynchronously
* Find word patterns to look for when filling the puzzle
* Find words in the word list that match a pattern
* Find definitions to the words selected for the puzzle calling an external API

To Dos:

* Feature to semi-randomly add black boxes?
* Implement a short-circuit to avoid blocking Node from doing other tasks? Perhaps with process.nexTick?

Won't Dos - As this project is for learning purposes, some overhead reducing improvements probably won't be done:

* Speed up lookup process by splitting dictionary by word length / first letter
