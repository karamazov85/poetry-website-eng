const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "/src/content");
let postlist = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log("Failed to list contents of dir" + err);
    }
    files.forEach((file, i) => {
      let obj = {};
      let post;

      fs.readFile(`${dirPath}/${file}`, "utf8", (err, contents) => {
        const lines = contents.split("\n");

        const getMetadataIndices = (acc, elem, i) => {
          if (/^---/.test(elem)) {
            acc.push(i);
          }
          return acc;
        };

        const parseMetadata = ({ lines, metadataIndices }) => {
          if (metadataIndices.length > 0) {
            let metadata = lines.slice(
              metadataIndices[0] + 1,
              metadataIndices[1]
            );
            metadata.forEach((line) => {
              obj[line.split(": ")[0]] = line.split(": ")[1];
            });
            return obj;
          }
        };

        const parseContent = ({ lines, metadataIndices }) => {
          if (metadataIndices.length > 0) {
            const content = lines.slice(metadataIndices[1] + 1, lines.length);
            return content.join("\n");
          }
        };

        const metadataIndices = lines.reduce(getMetadataIndices, []);
        const metadata = parseMetadata({ lines, metadataIndices });
        const content = parseContent({ lines, metadataIndices });
        const date = new Date(metadata.date);
        const timestamp = date.getTime() / 1000;
        const slug = metadata.title.toLowerCase().replace(/ /g, "-");

        post = {
          id: timestamp,
          slug: slug,
          title: metadata.title ? metadata.title : "No title given",
          author: metadata.author ? metadata.author : "No author given",
          teaser: metadata.teaser ? metadata.teaser : "No teaser here",
          date: metadata.date ? metadata.date : "No date given",
          featured: metadata.featured
            ? metadata.featured
            : "No feature info given",
          imageUrl: metadata.imageUrl ? metadata.imageUrl : "No image given",
          content: content ? content : "No content given",
        };

        postlist.push(post);
        // once all files have been pushed to postlist, write the postlist array into a JSON object
        if (postlist.length === files.length) {
          const sortedList = postlist.sort((a, b) => b.id - a.id);
          let data = JSON.stringify(sortedList);
          fs.writeFileSync("src/posts.json", data); // give a path and a filename you want to call it, then write the data JSON
        }
      });
    });
  });
  return;
};

getPosts();
