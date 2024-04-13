# Django-React Full Stack Project README

## Introduction
This project was meticulously crafted as part of a job interview process for a Django developer position, with a potential to evolve into a full React stack role. It demonstrates my ability to create a robust, scalable application using Django REST Framework (DRF) for the backend and React with TypeScript for the frontend.

## Project Overview
The task involved developing a new Django project to serve as a REST API for managing customer orders, including user management and order processing. For the front-end, React was used to provide an interactive UI, supporting user management and order functionalities. This document outlines the effort put into maximizing product quality, including system architecture, technologies used, and implementation details.

## Key Features
- **User System**: Implemented with the option to use Django’s built-in system or to create a custom system.
- **Order Management**: Modules for handling customer orders, including adding, viewing, and editing orders with pagination.
- **Product Management**: Functionality to add and edit products associated with orders.
- **Advanced UI**: Developed in React (using TypeScript only) to interact seamlessly with the backend, incorporating features like pagination, authentication, and state management via Redux.
- **Optimizations**: Focused on optimizing both the UI and API calls, including the usage of local storage.
- **Security**: Integrated token-based authentication.
- **Visualization**: Utilized CanvasJS for data visualization and Material-UI (MUI) for a versatile and responsive design.
- **Testing**: Comprehensive tests written for each app in the Django project.
- **API Documentation**: Support for OpenAPI schema, making the API accessible for library downloads in TypeScript.

## Technologies Used
- **Frontend**: React, TypeScript, Vite, Redux, MUI, CanvasJS
- **Backend**: Django REST Framework, SQLite, ModelViewSet, Token Authentication

## Installation and Running Instructions
First, clone the repository:
```
git clone <repository-url>
```

### Setting Up the Client
Navigate to the client directory and install dependencies:
```
cd client
npm install
```
To run the development server:
```
npm run dev
```

### Setting Up the Server
Navigate to the server directory and set up the Python environment:
```
cd server
pip install -r requirements.txt
venv/scripts/activate
```
Run the server:
```
python manage.py runserver
```

### Running Tests on the Server
To execute tests:
```
python manage.py test
```

## Deployment
Both the frontend and backend projects are deployed and functioning as a cohesive live system. The live site can be accessed at:
[Live Site URL](#)

## Conclusion
This project not only meets the job interview task requirements but extends beyond by incorporating additional technologies and features that showcase my skills and dedication to delivering high-quality software solutions. The attention to detail in optimizing the user interface and API interactions, along with the implementation of comprehensive testing and advanced features like state management and authentication, underscores my commitment to excellence in software development.
