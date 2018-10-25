




function nameGetter() {
    let displayBox = document.getElementById("pageContainer");
    let name = document.getElementById("name").value;
    let testNumber = /\d/;
    if (name == "") {
        displayBox.innerHTML = `Please enter a valid name`;
        return;
    }
    else if (testNumber.test(name)) {
        displayBox.innerHTML = `Please enter a valid name`;
        return;
    }
    else {
        displayBox.innerHTML = `Hello ${name}!`;
    }
}



