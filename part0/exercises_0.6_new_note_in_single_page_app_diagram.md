# HTTP Sequence Diagram for SPA

When creating a new note in a SPA.

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: User creates a new note and clicks on save button.
   
    browser->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser does not reload the page and renders the new note in the browser
