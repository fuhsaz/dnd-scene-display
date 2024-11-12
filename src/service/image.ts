import { downloadData, uploadData } from "aws-amplify/storage"

export async function uploadImage(id: string, file: File) {
  if (!file) {
    console.error("no file provided to uploadImage")
  } else if (!id) {
    console.error("no id provided to uploadImage")
  } else {
    return uploadData({
      path: `scenes/${id}`,
      data: file
    }).result
  }
} 

export async function getImage(path: string) {
  return downloadData({
    path: path
  })
}