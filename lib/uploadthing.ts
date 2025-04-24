import { generateReactHelpers } from "@uploadthing/react"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return { userId: "user" }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
      return { url: file.url };
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>() 