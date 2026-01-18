import { Request, Response } from "express";
import { processAndSaveImage } from "./image.service.js";
import { Media } from "../../database/media.upload.js";

export const uploadImageController = async (req: Request, res: Response) => {
  const file = req.file
  const name = req.body?.name

  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError })
  }

  if (!file) {
    return res.status(400).json({ message: "No File Is Provided" })
  }

  if (!name) {
    return res.status(400).json({ message: "No Name Is Provided" })
  }

  try {
    const image = await processAndSaveImage(file)

    const dbImage = await Media.create({ src: image?.imageUrl, alt: name })

    if (!dbImage) {
      return res.status(400).json({ message: "Image Not Saved" })
    }

    const response = {
      message: "Image Upload Successfully",
      file: {
        id: dbImage._id,
        fileName: image.fileName,
        url: image.imageUrl,
        size: image.size,
        width: image.width,
        height: image.height,
        mimetype: image.mimetype,
      }
    }

    return res.status(201).json({ response })
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    console.error("Image Upload Failed", error)
    return res.status(400).json({ message: "Image Upload Failed" })

  }
}
