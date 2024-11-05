// ฟังก์ชันสำหรับอัปโหลดรูปภาพ
function uploadImage(blobInfo, success, failure) {
  const formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  fetch('/upload', { // ตรวจสอบให้แน่ใจว่า URL /upload นี้พร้อมใช้งาน
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.location) {
        success(data.location); // ส่ง URL ของรูปภาพกลับไปให้ TinyMCE
      } else {
        failure('Failed to upload image');
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      failure('Image upload failed');
    });
}

tinymce.init({
  selector: '#content-body',
  plugins: 'lists link image table code help wordcount',
  toolbar: 'image',
  iamges_upload_url: '/upload',
  images_upload_handler: function (blobInfo, success, failure) {
    console.log(blobInfo)
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    fetch('/upload', { // ตรวจสอบ URL ของ endpoint สำหรับอัปโหลดภาพ
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.location) {
          success(data.location); // ส่ง URL ของรูปภาพกลับไปให้ TinyMCE
        } else {
          failure('Failed to upload image');
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        failure('Image upload failed');
      });
  }
});