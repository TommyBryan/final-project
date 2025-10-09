```mermaid
flowchart TD
    UI[User Interface] --> InternalAPI[Internal API Layer]

    InternalAPI --> OpenAI
    InternalAPI --> GoogleMaps
    InternalAPI --> Firebase

    subgraph External_APIs
        OpenAI["OpenAI API
        - Purpose: Text generation
        - Chosen: NLP quality"]

        GoogleMaps["Google Maps API
        - Purpose: Geolocation
        - Chosen: Accuracy"]

        Firebase["Firebase Auth API
        - Purpose: Authentication
        - Chosen: Easy integration"]
    end

    subgraph Internal_API_Endpoints
        TextGen["Endpoint: /api/v1/generate-text
        Method: POST
        Input: JSON with 'prompt'
        Output: JSON with 'response'"]

        Location["Endpoint: /api/v1/locations
        Method: GET
        Input: Query param 'city'
        Output: JSON with 'lat' and 'lng'"]

        Login["Endpoint: /api/v1/login
        Method: POST
        Input: JSON with 'email' and 'password'
        Output: JSON with 'token'"]
    end

    InternalAPI --> TextGen
    InternalAPI --> Location
    InternalAPI --> Login
    ```
