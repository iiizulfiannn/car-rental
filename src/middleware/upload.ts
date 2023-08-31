import { readFileSync } from "fs";
import multer from "multer";
import { fileNameImage } from "../helper/generate";

export default class UploadFile {
  upload: multer.Multer;

  constructor() {
    this.upload = multer({
      storage: this.diskStorage,
      fileFilter: this.imageFilter,
    });
  }

  private diskStorage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, fileNameImage(req.body.name, file.mimetype));
    },
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../resource/image/");
    },
  });

  private imageFilter(
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload only images."));
    }
  }
}
