# Route Optimizer App

Welcome to the Route Optimizer App! This application helps you find the shortest route between multiple locations using the Google Maps Distance Matrix API.

## Project Structure

This project consists of two main parts:

1. **Backend (ASP.NET Core Web API)**: Handles route optimization requests and interacts with the Google Maps API.
2. **Frontend (React Web Application)**: Provides the user interface for submitting locations and viewing the optimized route.

## Prerequisites

- **Backend**:
  - .NET SDK
  - Visual Studio (2019 or later)

- **Frontend**:
  - Node.js and npm
  - Visual Studio Code

## Setup Instructions

### Backend (ASP.NET Core Web API)

1. **Navigate to the `web-api` directory**:
```bash
cd web-api
```
2. **Open the project in Visual Studio:**
  - Double-click the `.sln` file or open it directly from Visual Studio.
3. **Run the application:**
  - Press `F5` or click on the "Run" button in Visual Studio to start the web API.

### Frontend (React Web Application)
1. **Navigate to the `web-app` directory:**
```bash
cd web-app
```
2. **Open the project in Visual Studio Code:**
  - Run `code .` in the terminal or open the directory through the Visual Studio Code interface.
3. **Install dependencies:**
```bash
npm install
```
4. **Run the application:**
```bash
npm start
```

## Usage

- **Frontend**: Access the web application at `http://localhost:3000` after running the frontend. Enter the desired locations, and the app will display the optimized route.
- **Backend**: The backend API will handle requests from the frontend, process them using the Google Maps Distance Matrix API, and return the shortest route.


Enjoy using the Route Optimizer App! If you encounter any issues or have any questions, feel free to reach out.