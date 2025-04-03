const CLOUDINARY_CLOUD_NAME = 'dwa3nnjrh'
const CLOUDINARY_UPLOAD_PRESET = 'apartmantImg'

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Cloudinary error:', errorData)
      throw new Error(`Upload failed: ${errorData.message || response.statusText}`)
    }

    const data = await response.json()
    console.log('Upload success:', {
      url: data.secure_url,
      fileName: file.name
    })

    return data.secure_url // Trả về URL ngay sau khi upload thành công
  } catch (error) {
    console.error('Upload error details:', {
      error,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })
    throw error
  }
}
