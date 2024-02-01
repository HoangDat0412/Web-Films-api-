const multer = require("multer");
const { mkdirp } = require("mkdirp");

const uploadVideo = () => {
  const made = mkdirp.sync(`public/film`);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/film");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const uploadStorage = multer({ storage: storage });

  return uploadStorage.fields(
    [{
        name: "src",
      },
      {
        name: "trailer",
      },
      {
        name: "img",
      }
    ]
  );
};

module.exports = {
  uploadVideo,
};
