const images_upload_handler_callback = () =>{

}

tinymce.init({
    selector: '#content-body',
    plugins: 'lists link image table code help wordcount',
    iamges_upload_url: '/news-management/image-uplaod',
    images_upload_handler: images_upload_handler_callback
  });