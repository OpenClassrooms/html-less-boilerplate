# Requirement
You must have *bower* and *grunt* installed locally :
```
npm install -g bower
npm install -g grunt-cli
```
# Installation
then install dependencies, CD in your directory :
```
npm install
bower install
```

#Usage
Main static files are in the ```src``` folder. This is where you can add / modify your html/img/js files.
Less files are in the ```less```directory.
When building the app, all src files are copied in a ```build```folder at the root, Less files are compiled into one single css file in ```build/css/main.css```

A basic cache busting is used to prevent css caching between builds (a timestamps is appended to the stylesheet link)

You can start a development server with :
```
grunt server
```

