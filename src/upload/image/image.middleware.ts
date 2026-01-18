import multer from "multer"
import { Request } from "express"

const storage = multer.memoryStorage()

const supportedFileMimeType = new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/avif",
])

const fileFilter: multer.Options["fileFilter"] = (req: Request, file, cb) => {
  // To Check The File Type Is Image
  if (!file.mimetype.startsWith("image/")) {
    req.fileValidationError = "Only Image Is Allowed"
    return cb(null, false)
  }

  // To Check The Give Image Type Is Supported
  if (!supportedFileMimeType.has(file.mimetype)) {
    req.fileValidationError = "Image Format Not Supported"
    return cb(null,false)
  }

  // If All The Check Is Done
  cb(null, true)
}

export const uploadImage = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024, }, })
