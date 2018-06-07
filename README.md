# Kaizen Express Framework Alpha
###### Express based framework for Rapid API Development

# Getting Started
###### Refer sample PostController if lost xD



Install all dependencies
```
npm install
```

Creating Mongoose Schema
* Create your desired mongoose scheme in the Model Folder under app

Creating New Controller Class
* Create class extending the base KDController in the core folder
* Import created Mongoose Schema
* Pass the schema to the super class constructor

Adding New Controller to the Application
* Open app.controller.config.ts
* Import the newly created Controller
* Add to the list of export object

Creating Routes
* Open routes.json
* Follow the structure in the "configs" key to define new route
```
   {
       //Base URL for the current API
        "base_url": "/api/v1/",
        //List of Routes for the current base url
        "configs": [
            {

                //Path to the current controller
                "path": "post",
                //controller name :  Case Sensitive
                "controller": "PostController",
               
               /*List of methods that is handled
                "request method name" :  "function in the controller handing the request method"
                Default Available Methods in the KDController
                get 
                getOne - needs id as params
                create
                update - needs id as params
                delete - needs id as params
                */

                "handlers": {
                    "GET": "get",
                    "POST": "create"
                   
                }
            }
        ]
    }
```

# Running Server
Open terminal and type
```
nodemon
```
and enter to start dev server



