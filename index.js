const {Storage} = require('@google-cloud/storage');
const csv = require('csv-parser');






exports.readObservation = (file, context) => {
   // console.log(`  Event: ${context.eventId}`);
   // console.log(`  Event Type: ${context.eventType}`);
   // console.log(`  Bucket: ${file.bucket}`);
   // console.log(`  File: ${file.name}`);


   const gcs = new Storage();

   const datafile = gcs.bucket(file.bucket).file(file.name);


   datafile.createReadStream()
   .on('error', () => {
     // handle an error
     console.error(error);
   })
   .pipe(csv())
   .on('data',(row) => {
    // log raw data
    //console.log(row)
    printDict(row);

   })
   .on('end',() => {
    // handle end of csv
    console.log('end!');
   })

}

// HELPER FUNCTION 
function printDict(row){
  for (let key in row){
    console.log(key + ':' + row[key]);
    console.log(`${key}: ${row[key]}`)
  }
}