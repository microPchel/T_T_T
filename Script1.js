document.querySelectorAll('.styled-slider').forEach(slider => {
    const fill = slider.nextElementSibling; 
    const valueDisplay = slider.closest('.slider-container').querySelector('.slider-value');


    fill.style.width = `${slider.value}%`;
    valueDisplay.textContent = slider.value;


    slider.addEventListener('input', function () {
        fill.style.width = `${this.value}%`;
        valueDisplay.textContent = this.value;
    });
});

document.getElementById('download-pdf')?.addEventListener('click', function () {

    const element = document.createElement('div');
    element.innerHTML = document.querySelector('body').innerHTML;
    element.querySelector('#download-pdf').remove(); 


    const opt = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true,
            scrollY: 0 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };


    html2pdf().from(element).set(opt).save();
});


document.querySelectorAll('.styled-slider').forEach(slider => {
    const fill = slider.nextElementSibling;
    const valueDisplay = slider.closest('.slider-container').querySelector('.slider-value');
    fill.style.width = `${slider.value}%`;
    valueDisplay.textContent = slider.value;
    slider.addEventListener('input', function () {
        fill.style.width = `${this.value}%`;
        valueDisplay.textContent = this.value;
    });
});


function saveEditableFields() {
    document.querySelectorAll('[contenteditable="true"]').forEach((element, index) => {
        const path = getElementPath(element); 
        const key = `editable_${path}`;


        if (localStorage.getItem(key)) {
            element.textContent = localStorage.getItem(key);
        }

        element.addEventListener('input', () => {
            localStorage.setItem(key, element.textContent);
        });
    });
}


function getElementPath(element) {
    const path = [];
    while (element.parentNode) {
        path.unshift(Array.from(element.parentNode.children).indexOf(element));
        element = element.parentNode;
    }
    return path.join('-');
}


document.addEventListener('DOMContentLoaded', saveEditableFields);


const photoUpload = document.getElementById('photo-upload');
const portret = document.getElementById('portret');


if (localStorage.getItem('userPhoto')) {
    portret.src = localStorage.getItem('userPhoto');
}


photoUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {

        localStorage.setItem('userPhoto', event.target.result);
        portret.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('clear-data')?.addEventListener('click', () => {
    if (confirm('Удалить все сохранённые данные?')) {
        localStorage.removeItem('userPhoto');
        portret.src = 'photo/portret.png'; 

    }
});


document.addEventListener('click', function (e) {

    const target = e.target.closest('.wave-effect');

    if (target) {
        createWave(e, target);
    }
});

function createWave(e, element) {

    const wave = document.createElement('span');
    wave.className = 'wave';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${e.clientX - rect.left - size / 2}px`;
    wave.style.top = `${e.clientY - rect.top - size / 2}px`;

    element.appendChild(wave);


    setTimeout(() => wave.remove(), 600);
}