function registertYourSelf(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var email = document.getElementById("email").value;
    // Regular expression for a password validation (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("cpassword").value;

    if (name === "") {
        Swal.fire({
            icon: "error",
            title: "Write Name.",
        });
    } else if (email === "") {
        Swal.fire({
            icon: "error",
            title: "Write an Email",
        });
    }
    else if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
        });
    } else if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        });
    } else if (password === "") {
        Swal.fire({
            icon: "error",
            title: "Write Password.",
        });
    } else if (confirmpassword === "") {
        Swal.fire({
            icon: "error",
            title: "Write confirm Password",
        });
    } else if (confirmpassword !== password) {
        Swal.fire({
            icon: "error",
            title: "Please Match Password.",
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "You have been registered successfully.",
            timer: 1000
        });
        var userData = {
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        }
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
    localStorage.setItem("userData", JSON.stringify(userData));
}

function signInYourSelf(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var localStorageData = JSON.parse(localStorage.getItem("userData"));
    if (localStorageData.email !== email) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email.",
        });
    } else if (localStorageData.password !== password) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password.",
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "You have been LogIn successfully.",
            timer: 1000,
        });
        setTimeout(() => {
            window.location.href = "blog.html";
        }, 2000);
    }
}