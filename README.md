# ParseCMS

ParseCMS is a CMS built on top of Facebooks BaaS Parse. It's very modular and flexible as everything the system needs to know about your data-structure is handled by a file called project.json. Based on the file, the CMS is able to scaffold a database on Parse, and determine how the CMS is set up(for example how a datatype should be displayed in the CMS). The CMS is built using Angular, SASS and Bootstrap and with the help of Grunt, Bower, NPM and Yeoman.

This is not entirely done, so it's not production-ready!

# Install

`npm install && bower install`

`grunt build`

Change Parse-constants in app.js

Edit project.json to match criteria

Scaffold database with setup.html

# Supported datatypes
GPS Coordinates
Images
Strings
Numbers

# Nice to know

All directives beginning with ParseEl are page elements like forms and tables.
All directives beginning with ParseMo are modules used to display and edit specific datatypes.
Directives ending with 'cell' are used to display datatypes in tables

# TODO
    - Linting
    - Implement parse security model
    - Unit testing
    - Dashboard
