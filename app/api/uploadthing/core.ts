import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(() => {
      console.log("Middleware running...");
      return {};
    })
    .onUploadComplete((res) => {
      console.log("Upload complete!", res);
      return { url: res.file.url };
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 