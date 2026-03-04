# Event Website

## Description
This project is an event website application, featuring a Dart-based backend server and a frontend served by static HTML, CSS, and JavaScript files. It is structured to be easily deployable and manageable.

## Features
- **Dynamic Content:** Served by a Dart backend, suggesting potential for dynamic data handling or API integration.
- **Responsive Frontend:** Utilizes standard web technologies (HTML, CSS, JavaScript) for a flexible user interface.
- **Static Asset Hosting:** Serves `index.html`, `styles.css`, and `script.js` from the `public/` directory.

## Technologies Used
- **Backend:** Dart
- **Frontend:** HTML5, CSS3, JavaScript
- **Dependency Management:** Dart's `pub` (indicated by `pubspec.yaml` and `pubspec.lock`)

## Setup and Installation

To set up this project locally, follow these steps:

1.  **Ensure Dart SDK is Installed:**
    Make sure you have the Dart SDK installed on your system. You can download it from the [official Dart website](https://dart.dev/get-dart).

2.  **Navigate to Project Directory:**
    ```bash
    cd event_website
    ```

3.  **Install Dependencies:**
    ```bash
    dart pub get
    ```

## Running the Project

To run the event website:

1.  **Start the Server:**
    ```bash
    dart bin/server.dart
    ```
    The server will typically start on a port like `8080` (check `bin/server.dart` for exact port if different).

2.  **Access in Browser:**
    Open your web browser and navigate to `http://localhost:8080` (or the port specified by the server).

## Project Structure

```
.
├── pubspec.lock             # Dart dependency lock file
├── pubspec.yaml             # Dart project configuration and dependencies
├── .dart_tool/              # Dart build artifacts and tool configuration
│   ├── package_config.json
│   └── package_graph.json
├── bin/
│   └── server.dart          # Backend server logic written in Dart
└── public/
    ├── index.html           # Main HTML file for the website
    ├── script.js            # Frontend JavaScript for interactivity
    └── styles.css           # Frontend CSS for styling
```
