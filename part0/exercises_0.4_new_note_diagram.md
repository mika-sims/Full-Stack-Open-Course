# HTTP Sequence Diagram for traditional web application

When creating a new note in a web application.

```mermaid

sequenceDiagram
participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note 
    activate server 
    Note left of server: Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: 302 Found 
    deactivate server

    Note right of browser: The browser reloads the Notes page. The reload causes new HTTP requests

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS style sheet
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: The browser runs JavaScript code that fetches JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "new note", "date": "2024-02-27" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
