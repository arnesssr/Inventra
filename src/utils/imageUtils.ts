export const validateImage = async (file: File): Promise<boolean> => {
  // Size validation (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    console.error('File too large:', file.name)
    return false
  }

  // Type validation
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    console.error('Invalid file type:', file.type)
    return false
  }

  // Dimension validation
  try {
    const dimensions = await getImageDimensions(file)
    if (dimensions.width < 200 || dimensions.height < 200) {
      console.error('Image too small:', dimensions)
      return false
    }
  } catch (error) {
    console.error('Failed to validate image dimensions:', error)
    return false
  }

  return true
}

export const createSafeObjectURL = (file: File): string | null => {
  try {
    return URL.createObjectURL(file)
  } catch (error) {
    console.error('Failed to create object URL:', error)
    return null
  }
}

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
