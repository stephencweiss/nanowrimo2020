const fs = require("fs");
const path = require("path");
const wordCount = require("wordcount");

function findAllMdFiles(directoryPath) {
  const mdFilePaths = [];
  const dirQueue = [directoryPath];

  while (dirQueue.length) {
    const dir = dirQueue.pop();
    const dirContents = fs.readdirSync(dir);
    dirContents.forEach((el) => {
      const elPath = path.resolve(dir, el);
      const stat = fs.statSync(elPath);
      if (stat && stat.isDirectory()) {
        dirQueue.push(elPath);
      } else if (stat && path.extname(elPath) === ".md") {
        mdFilePaths.push(elPath);
      }
    });
  }
  return mdFilePaths;
}

function count(filePath) {
  const file = fs.readFileSync(filePath, { encoding: "utf-8" });
  return wordCount(file);
}

function countAllWords() {
  const fileList = findAllMdFiles(path.resolve(__dirname, "src"));
  const totalWordCount = fileList.reduce(
    (acc, filePath) => acc + count(filePath),
    0
  );
  console.log(`|${new Date().toISOString()} | ${totalWordCount}|`);
  return totalWordCount;
}

countAllWords();
