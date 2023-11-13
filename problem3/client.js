const fetch = require("node-fetch");

async function getFilesInDir(items) {
  const result = [];

  for (let item of items) {
    if (item.isDir == false) {
      result.push(item.name);
    } else {
      const dirResponse = await fetch(`http://localhost:3000/${item.name}`);
      const dirData = await dirResponse.json();
      const dirFiles = dirData.files;

      for (let file of dirFiles) {
        if (file.isDir == false) {
          result.push(file.name);
        }
      }
    }
  }

  return result;
}

async function main() {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();

  const items = data.items;

  console.log(await getFilesInDir(items));
}

main();
