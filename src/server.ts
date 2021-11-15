import express from "express";
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Endpoint to filter an image
  app.get('/filteredimage', async (request, result) => {
    const urlParam = request.query.image_url;

    // Check if the parameter has been provided
    if (!urlParam) {
      return result.status(400).send({
        message: 'Missing \'image_url\' parameter from query!'
      });
    }

    // Process the image
    try {
      const image = await filterImageFromURL(urlParam);

      result.sendFile(image, () =>
        // Remove local files using provided function
        deleteLocalFiles([image])
      );
    } catch (e) {
      // Failed to filter the image, send suggested http error code
      result.sendStatus(422).send('Failed to filter the provided image: ' + e);
    }
  })

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();