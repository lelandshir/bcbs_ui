# BCBS App Frontend

This folder contains the frontend code for the app. It is responsible for the user interface and interactions with the backend server.

### Getting Started
- These instructions will help you get the frontend up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm should be installed on your machine. You can download them from https://nodejs.org :P.
- Installation
    - Open a terminal or command prompt and navigate to the ui folder:
        - `cd bcbs_app/ui`
        - Install the dependencies by running `npm install`
- Development Server
    - To start the dev server, aka running the frontend locally, run: `npm start`
    - The dev server will start and the app will run at `http://localhost:3000`.

- Build
    - To build the production-ready optimized version of the frontend, use the following command:
        - npm run build
        - The optimized build will be created in the build directory

### Project Structure
The folder structure of the frontend is organized as follows:
    - public: Contains the HTML template and public assets (none really).
    - src: Contains the main source code.
    - components: Contains reusable components used throughout the app.
    - hooks: Contains custom hooks for handling logic and data fetching.
    - styles: Contains CSS or SCSS stylesheets for styling the components.
    - views: Contains the different views or pages of the application.
    - App.tsx: The main entry point of the application.
    - index.tsx: The entry point for rendering the application.

### Contributing
Contributions to the project are welcome if you want to modify the code. Please just open an issue or submit a pull request :)

All the best,

Léland