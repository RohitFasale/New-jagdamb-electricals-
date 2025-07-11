// ---------------------- menu section small screen -----------------

const sideM = document.getElementById('sidemenu')
function openmenu(){
    sideM.style.right = '0';
}
function closemenu(){
    sideM.style.right = '-200px';
}





// ---------------------- video section when touch on video it zoom and zoom out -----------------

document.addEventListener('DOMContentLoaded', function () {
    // if (window.innerWidth <= 768) {
    //     const replacements = [
    //         { selector: '.f1v', src: 'assets/f1v (1).mp4' },
    //         { selector: '.s2v', src: 'assets/s2v (1).mp4' },
    //         { selector: '.t3v', src: 'assets/t3v (1).mp4' },
    //         { selector: '.f4v', src: 'assets/f4v (1).mp4' }
    //     ];

    //     replacements.forEach(item => {
    //         const video = document.querySelector(item.selector);
    //         if (video) {
    //             video.querySelector('source').src = item.src;
    //             video.load();
    //         }
    //     });
    // }

    // ✅ Add modal click functionality
    const videos = document.querySelectorAll('.video-sec video');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    videos.forEach(video => {
        video.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalVideo.src = this.querySelector('source').src;
            modalVideo.load();
            modalVideo.play();
        });
    });

    // ✅ Close modal on click outside
    modal.addEventListener('click', function () {
        closeModal();
    });

    // ✅ Close modal on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    function closeModal() {
        modalVideo.pause();
        modalVideo.src = "";
        modal.style.display = 'none';
    }
});




// --------------------- work-2 img logic ---------------------

// Attach to all zoomable images
document.querySelectorAll('.zoomable-img').forEach(img => {
    // Store original img-x class for restoration later
    const originalClass = Array.from(img.classList).find(cls => cls.startsWith('img-'));
    img.dataset.originalClass = originalClass;

    img.addEventListener('click', function (e) {
        e.stopPropagation(); // prevent outside click

        // If already enlarged, close it
        if (this.classList.contains('enlarged')) {
            this.classList.remove('enlarged');
            this.classList.add(this.dataset.originalClass);
        } else {
            // Close any other enlarged images first
            document.querySelectorAll('.zoomable-img.enlarged').forEach(openImg => {
                openImg.classList.remove('enlarged');
                openImg.classList.add(openImg.dataset.originalClass);
            });

            // Remove original positioning class, add enlarged
            this.classList.remove(this.dataset.originalClass);
            this.classList.add('enlarged');
        }
    });
});

// Close on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll('.zoomable-img.enlarged').forEach(img => {
            img.classList.remove('enlarged');
            img.classList.add(img.dataset.originalClass);
        });
    }
});

// Close on clicking outside
document.addEventListener('click', function () {
    document.querySelectorAll('.zoomable-img.enlarged').forEach(img => {
        img.classList.remove('enlarged');
        img.classList.add(img.dataset.originalClass);
    }); 
});



// ------------------------- Google sheets -------------------------------




const scriptURL = 'https://script.google.com/macros/s/AKfycbwH6Ij91P3rxaNQ5rDp_eyXMWL5sPBoDtCsT7fnrhZF0cpoGy3TlhCRNeh5MKhfvqB7/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")


form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message Sent Successfully..."
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

