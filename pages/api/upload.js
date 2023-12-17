import multiparty from "multiparty";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import fs from "fs";
import mime from "mime-types";

const containerName = "ecommerceadmin";
const accountName = "ecommercenextjs";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      resolve({ fields, files });
      if (err) reject(err);
    });
  });

  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Check if the container exists, if not, create it
  const containerExists = await containerClient.exists();
  if (!containerExists) {
    await containerClient.create();
  }
  const links = [];

  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;

    const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

    await blockBlobClient.uploadData(fs.readFileSync(file.path), {
      blobHTTPHeaders: { blobContentType: mime.lookup(file.path) },
      accessConditions: { modifiedAccessConditions: { ifNoneMatch: "*" } },
    });

    const link = `https://${accountName}.blob.core.windows.net/${containerName}/${newFilename}`;
    links.unshift(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
