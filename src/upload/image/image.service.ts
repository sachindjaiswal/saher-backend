import sharp from "sharp";
import path from "path";
import crypto from "crypto"
import fs from "fs/promises"

const uploadPath = path.join(process.cwd(), "public", "uploads", "images")
const baseUrl = process.env.BASE_URL ?? "http://localhost:4000"


export const processAndSaveImage = async (file: Express.Multer.File) => {
  const fileName = `${crypto.randomUUID()}.webp`
  const filePath = path.join(uploadPath, fileName)
  const imageUrl = `${baseUrl}/uploads/images/${fileName}`

  try {
    // Ensure Directory Exists
    await fs.mkdir(uploadPath, { recursive: true })

    const info = await sharp(file.buffer)
      .resize({ width: 1024, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filePath)

    return {
      fileName,
      imageUrl,
      size: info.size,
      width: info.width,
      height: info.height,
      mimetype: "image/webp"
    }
  }
  catch (error) {
    console.error("Image Upload Failed", error)
    throw error
  }
}
