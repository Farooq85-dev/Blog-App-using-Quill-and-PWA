//LogOut
function logOut() {
    if (!(JSON.parse(localStorage.getItem("userData")))) {
        Swal.fire({
            icon: "warning",
            title: "To perform LogOut. Please Goto SignUp to register Your-Self.",
        });
    } else {
        setTimeout(() => {
            localStorage.clear();
            window.location.href = "./index.html";
        }, 1500);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully LogOut.",
            timer: 1000,
        });
    }


}

var toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'align': [] }],
    [{ 'direction': 'rtl' }],                         // text direction
    ['code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    ['link', 'image', 'video', 'formula'],
    ['clean'],                                         // remove formatting button
];

var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions
    }
});

//For Date:-
flatpickr("#dateInput", {
    dateFormat: "m-d-Y", // customize date format
    position: "left",    // position the calendar to the left
});

//For Time:-
flatpickr("#timeInput", {
    enableTime: true,
    noCalendar: true,
    time_24hr: false,
    time_12hr: true,
    appendTo: document.body,
    inline: false,
    altInput: true,
    altFormat: "H:i",
    onClose: function (selectedDates, dateStr, instance) {
        // Apply custom styles to the time picker dropdown
        const calendarContainer = instance.calendarContainer;
        if (calendarContainer) {
            calendarContainer.style.position = "fixed";
            calendarContainer.style.left = "auto"; // Reset left position
            calendarContainer.style.right = "0";   // Position to the right
        }
    },

});


//Submit the post:-
function submitPost() {
    var title = document.getElementById('title').value;
    var tag = document.getElementById('tag').value;
    var time = document.getElementById('timeInput').value;
    var date = document.getElementById('dateInput').value;
    var quillContent = quill.root.innerHTML;
    var quillText = quill.getText();
    if (!quill) {
        alert('Quill is not properly initialized.');
        return;
    }
    if (title === "") {
        Swal.fire({
            icon: "warning",
            title: "Please write a title.",
        });
    } else if (tag === "") {
        Swal.fire({
            icon: "warning",
            title: "Please write tag.",
        });
    } else if (time === "") {
        Swal.fire({
            icon: "warning",
            title: "Please select time.",
        });
    } else if (date === "") {
        Swal.fire({
            icon: "warning",
            title: "Please select date.",
        });
    } else if (!quillText.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Please create your blog.",
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "WOW!",
            timer: 500,

        });
        var afterPost = document.getElementById('card').innerHTML = `
        <div class="card">
        <article id="overlay2">
      <h1>${title}</h1>
      <h3>${tag}</h3>
      <p>${quillContent}</p>
      <h6 id="T">Blog Time: ${time}</h6>
      <h6 id="D">Blog Date: ${date}</h6>
    </article>
        </div>
        `
    }

}

//Delete Blog

function deletePost() {
    document.getElementById("card").innerHTML = "";
}

//Popup
function openPopup() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        Swal.fire({
            icon: "warning",
            title: "Please creat your Account first.",
        });
    } else {
        var userName = userData.name;
        var userEmail = userData.email;
        var userPassword = userData.password;
        document.getElementById('popUp').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.querySelector("#userName").innerHTML = `${userName}`;
        document.querySelector("#userEmail").innerText = ` ${userEmail}`;
        document.querySelector("#userPassword").innerText = `${userPassword}`;
    }

}

function closePopup() {
    document.getElementById('popUp').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
        Notification.requestPermission().then(res => {
            if (Notification.permission == 'granted') {
                console.log("Granted permission")
                return
            }
            console.log(res)
        })
            .catch(err => console.log("service worker not registered", err))
    })

    navigator.serviceWorker.ready.then((swReg) => {
        // console.log(swReg)
        var options = {
            message: "This is message body.",
            icon:"/assets/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}