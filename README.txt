# U4Ea Webapp 

U4Ea Webapp is a binaural beats generator app which also has a gamified component. Users are able to log in
to record how the binaural beats have affected their feelings. This webapp was creating using React.js, Node.js,
express.js with a Microsoft Azure SQL database. 

contact Kota Soda at kota_soda@brown.edu for front end questions, Andrew Boden at andrew_boden@brown.edu for back end.

## Landing Page

The landing page prompts a user to select either the simple webapp or gamified webapp (through login). 
Nothing too complicated here. 

## Simple Webapp 

The simple webapp is a trial version of the binaural beats generator. It is completely static, and stores 
the beats information in the data.json file in the src folder. The interface of the simple webapp can be found in 
/client/src/components/Webapp.js. The user is first run through a tutorial using react-joyride, and is prompted
to select their feelings, activities, and boosts. Information about the three options is also parsed from data.json
After the three options are selected, the disabled attribute on the bottom of the screen is temporarily deleted, 
and the user is able to press play. After pressing play, a binaural beat object is created 
(check client/src/js/beats.js for more information on beat creation), and starts playing. 

## Gamified Webapp

the gamified webapp is a version of the binaural beats generator that includes user logins and more features–
check gamification development docs for more info (contact Brandon Howard for access: brandon@amgineink.com).
The user information is stored in a Microsoft Azure database (again, contact Brandon for server access), and 
passwords are encrypted using bcrypt. Once a user logs in, they are able to access more personalized features. 
Backend code is located in the server folder, and user information is stored in redux store in the client folder
after login.  