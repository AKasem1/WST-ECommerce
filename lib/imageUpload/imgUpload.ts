const imgUpload = async (image: File | Blob | string): Promise<string | undefined> => {
    const key = process.env.NEXT_PUBLIC_IMG_UPLOAD_KEY; 
    console.log("key: ", key);
    
    if (!key) {
        throw new Error('Image upload key is not configured');
    }
    if (!image) {
        throw new Error('No image provided for upload');
    }
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('key', key);
  
    try {
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data?.data?.url) {
        console.log('Image URL:', data.data.url);
        return data.data.url;
      } else {
        console.error('Unexpected response format:', data);
      }
  
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };
  
  export default imgUpload;
  