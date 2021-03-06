import busboy from "busboy";
import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";
import { createVideo } from "./video.service";
//to make application scale we use busboy'

const MIME_TYPES = ["video/mp4"];

function getPath({
  videoId,
  extension,
}: {
  videoId: Video["videoId"];
  extension: Video["extension"];
}) {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
}
export async function uploadVideoHandler(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  const user = res.locals.user;

  const video = await createVideo({ owner: user.id });
  bb.on("file", async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res.status(StatusCodes.BAD_REQUEST).send("invalid file type");
    }
    const extension = info.mimeType.split("/")[1];

    const filePath = getPath({
      videoId: video.videoId,
      extension,
    });

    video.extension = extension;
    await video.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: "close",
      "Content-Type": "application/json",
    });

    res.write(JSON.stringify(video));
    res.end();
  });

  return req.pipe(bb);
}
