
const fs = require('fs');
const { MongoClient } = require('mongodb');


function readHTMLFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading HTML file:', error);
    return null;
  }
}

function extractData(html) {
  const formData = new FormData(html.querySelector('#step3Form'));
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}


async function saveToMongo(data, step) {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('Standard_Chattered'); 


    const collectionName = `Step_${step}`;
    const collection = database.collection(collectionName);



    const result = await collection.insertOne(data);
    console.log(`Data inserted into ${collectionName} collection:`, result.insertedId);
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
  } finally {
    await client.close();
  }
}



function main() {
  const filePath = 'C:/Users/YASH/OneDrive/Desktop/standard/index.html';
  const html = readHTMLFile(filePath);

  if (html) {
    const data = extractData(html);
    const step = 3; 
    saveToMongo(data, step);
  }
}

main();
