document.getElementById('newsForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    var content = encodeURIComponent(tinymce.activeEditor.getContent())
    // document.getElementById('test-get-text').innerHTML = Content
    const form = e.target;
    let formData = new FormData(form)
    formData.append('body', content)
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    try {
        const response = await fetch('/news-management/insert', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "เพิ่มข่าวสารสำเร็จแล้ว"
            });
            form.reset(); // เคลียร์ฟอร์มหลังการส่งสำเร็จ
        } else {
            console.log(result)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    } catch (error) {
        console.log(error);
    }
})

// Dynamic Textarea
const textarea_title = document.getElementById('title');
function adjustTextareaHeight() {
    textarea_title.style.height = 'auto'; // รีเซ็ตความสูงก่อนคำนวณใหม่
    textarea_title.style.height = textarea_title.scrollHeight + 'px'; // ปรับความสูงตาม scrollHeight
}
textarea_title.addEventListener('input', adjustTextareaHeight);
window.addEventListener('load', adjustTextareaHeight);


// Preview Images
const input = document.getElementById('thumbnail_img');
const previewPhoto = () => {
    const file = input.files;
    const preview = document.getElementById('thumbnail-preview');
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            preview.setAttribute('src', event.target.result);
            preview.removeAttribute('hidden')
        }
        fileReader.readAsDataURL(file[0]);
    } else {
        preview.setAttribute('hidden', true)
    }
}
input.addEventListener("change", previewPhoto);