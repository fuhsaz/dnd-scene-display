import { downloadData, remove, uploadData } from "aws-amplify/storage";

export async function uploadImage(id: string, file: File) {
  if (!file) {
    console.error("no file provided to uploadImage");
  } else if (!id) {
    console.error("no id provided to uploadImage");
  } else {
    return uploadData({
      path: `scenes/${id}`,
      data: file,
    }).result;
  }
}

export async function downloadImage(url: string) {
  const imageResponse = await getImage(url);
  const result = await imageResponse.result;
  const imageBlob = await result.body.blob();
  return URL.createObjectURL(imageBlob);
}

export async function getImage(path: string) {
  return downloadData({ path });
}

export async function deleteImage(path: string) {
  return remove({ path });
}
