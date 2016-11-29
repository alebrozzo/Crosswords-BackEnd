CAVEAT: I understand that NodeJS is not the best environment for implementing this type of application (little IO/net, much CPU). However, the intent of this project is to improve my javascript / node skills,
which is why I am creating a more "logic instensive" than "UI/UX intensive" app   

A crosswords creation application.The user indicates the horizontal and vertical sizes, and places black boxes on the puzzle. It then requests for the list of horizontal and vertical words.

Completed tasks:
* Create an empty structure of hegight and length defined by the user
* Set the words numbering by finding where a word starts and the length it should have, and fills two arrays (one for horizontal and one for vertical) with that information,
 and placeholders for words and definitions to be set once the puzzle is created 
* Load a dictionary (a word list actually) asynchronously
* Find word patterns to look for when filling the puzzle
* Find words in the word list that match a pattern, allowing to skip any number of words allowing for word discarding on recursivity 

To Dos:
* Feature to semi-randomly add black boxes?
* Start the puzzle with a random word to reduce duplication of puzzles? Perhaps reorder words on dictionary for the same purpose?
* Replace the word list with a dictionary or search for the word definitions on the fly (less memory, more net overhead)
* Implement a short-circuit to avoid blocking Node from doing other tasks, perhaps by setting a 

Won't Dos - As this project is for learning purposes, some overhead reducing improvements probably won't be done: 
* Speed up lookup process by splitting dictionary by word length / first letter
