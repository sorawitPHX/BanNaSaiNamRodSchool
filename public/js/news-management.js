document.getElementById('submit-btn').addEventListener('click', (e)=>{
    var Content = tinymce.activeEditor.getContent();
    console.log(Content)
    document.getElementById('test-get-text').innerHTML = Content
})

const textarea_title = document.getElementById('title');

// ฟังก์ชันปรับขนาด textarea
function adjustTextareaHeight() {
    textarea_title.style.height = 'auto'; // รีเซ็ตความสูงก่อนคำนวณใหม่
    textarea_title.style.height = textarea_title.scrollHeight + 'px'; // ปรับความสูงตาม scrollHeight
}

// เรียกฟังก์ชันเมื่อมีการพิมพ์ข้อความ
textarea_title.addEventListener('input', adjustTextareaHeight);

// ปรับขนาดเมื่อโหลดหน้าเว็บด้วย
window.addEventListener('load', adjustTextareaHeight);