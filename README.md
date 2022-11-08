<h3 align="center">Technical test - backend challenge</h3>

# Docs

- [About](#About)
- [instructions](#instructions)
- [Usage](#Usage)

# About

This project is a Node Js App for fetching artists by name and return results to the user and create CSV file containing the result. 

# instructions

- Clone the project to your local machine 
- Add the dot env file in the root folder with the PORT , BASE_URL = 'http://ws.audioscrobbler.com/2.0' and API_KEY  .
- Run 'npm install' to install the necessary dependencies.
- Run  'npm run dev' to start the application .
- Surf to `localhost:PORT/artist/:artistToLookFor/:CsvFileName` .

# Usage

- The first parametere is the artist that you want to search for 
- The second parametere is the CSV file name that will be generated in the folder `/generatedCsvFiles`.

Example : i want to search for artist with name `Eminem` and store the result in file named `eminemSearchResult.csv` .

the URL will be   `localhost:3001/artist/eminem/eminemSearchResult`  .