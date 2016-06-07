###Alexa Study Buddy (ASB) | alexastudybuddy.com


<img style="float: left;" src="http://alexa-study-buddy.herokuapp.com/images/alexa_study_buddy.png">
<!-- ![alt tag](http://alexa-study-buddy.herokuapp.com/images/alexa_study_buddy.png "Alexa Study Buddy") -->

The ASB project was created so that any individual can create a quiz for Alexa. There are many applications for this, the most obvious is for studying for tests. Audio learners appreciate the ability to go over questions out loud, and Alexa makes for the perfect Study Buddy.

The Alexa Skill is hosted on AWS lambda. In order to create, change or delete a quiz, the user interfaces through an external website at www.alexastudybuddy.com. In addition, they can take quizzes created by others.
For simplicity sake, all quizzes are 4 item multiple choice questions.  

When questions are added, the correct answer should always be entered into the first answer slot. Then the program shuffles the answers and the questions upon presentation.  The user can stop a quiz at any time by saying "Alexa, stop".

##Technologies

ASB was built with the PANE stack. It utilizes the following tech:

* PostgreSQL with Knex
* Angularjs
* Nodejs
* Express 
* Sass

The Alexa Skill was created with Nodejs and is hosted on AWS Lambda. 










