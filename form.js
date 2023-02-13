const main_form = document.getElementById("main_form");
const pages = [...document.getElementsByClassName("page")];
const progress_steps = [...document.querySelectorAll(".step")];
const moving_bar = document.querySelector(".progress_bar_movement");

error = (element, errormsg) => {

    let parent = element.parentElement;
    parent.querySelector(".input").style.borderColor="red";
    parent.querySelector(".input").style.borderWidth="3px";
    parent.querySelector("#right").classList.remove("visible");
    parent.querySelector("#wrong").classList.add("visible");
    parent.querySelector("#msg").innerText = errormsg;
    parent.querySelector("#msg").classList.add("visible");
    parent.style.marginBottom = "0px";
    return false;
}

blank_input =(element)=>{

    let parent = element.parentElement;
    parent.querySelector(".input").style.borderColor="black";
    parent.querySelector("#right").classList.remove("visible");
    parent.querySelector("#msg").classList.remove("visible");
    return true;
}

success = (element) => {
    let parent = element.parentElement;
    parent.querySelector(".input").style.borderColor="lightblue";
    parent.querySelector(".input").style.borderWidth="3px";
    parent.querySelector("#wrong").classList.remove("visible");
    parent.querySelector("#msg").classList.remove("visible");
    parent.querySelector("#right").classList.add("visible");
    parent.style.marginBottom = "15px";
    return true;
}

validEmail = (element) =>{
    
    const data = element.value.trim();

    if(data === "")
        return error(element, "Email cannot be blank");
    if(data.length < 7)
        return error(element, "Enter a valid Mail ID");    
    if(data.indexOf("@") < 1)
        return error(element, "Enter a valid Mail ID");
    if(data.lastIndexOf(".") <= data.indexOf("@")+3 || data.lastIndexOf(".") === data.length -1)
        return error(element, "Enter a valid Mail ID");
    if(data.indexOf(".")+1 === data.lastIndexOf("."))
        return error(element, "Enter a valid Mail ID");
    
    return success(element);
}

validPassword = (element) =>{
    
    const data = element.value.trim();

    if(data === "")
        return error(element, "Password cannot be blank");
    if(data.length < 5)
        return error(element, "Password must be minimum 5 characters");
    
    return success(element);
}

validConfPassword = (element1, element2) =>{
    
    const data = element2.value.trim();

    if(data === "")
        return error(element2, "Password cannot be blank");
    if(data.length < 5)
        return error(element2, "Password must be minimum 5 characters");
    if(element1.value.trim() !== data)
        return error(element2, "Password doesn't match");

    return success(element2);
}

validProfileLink = (element) =>{
    
    let data = element.value.trim();

    if(data === "")
        return blank_input(element);
    else
        return success(element);
}

validFirstName = (element) =>{
    
    let data = element.value.trim();

    if(data === "")
        return error(element, "First name cannot be blank");
    
    success(element);
}

validMiddleName = (element) =>{

    let data = element.value.trim();
    if(data !== "")
        return success(element);

    return blank_input(element);
}

validLastName = (element) =>{
    
    let data = element.value.trim();

    if(data === "")
        return error(element, "Last name cannot be blank");
    
    success(element);
}

validateNext = (page_no) =>{

    if(page_no === 0)
    {
        let flag1 = 1;
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let cpassword = document.getElementById("conf_password");

        if(validEmail(email) === false)
            flag1 = 0;
        if(validPassword(password) === false)
            flag1 = 0;
        if(validConfPassword(password, cpassword) === false)
            flag1 = 0;          

        if(flag1 === 1)
            return true;
        else
            return false;
    }

    if(page_no === 1)
    {
        let flag2 = 1;
        let facebook = document.getElementById("facebook");
        let twitter = document.getElementById("twitter");
        let linkedin = document.getElementById("linkedin");

        if(validProfileLink(facebook) === false)
            flag2 = 0;
        if(validProfileLink(twitter) === false)
            flag2 = 0;
        if(validProfileLink(linkedin) === false)
            flag2 = 0;

        if(flag2 === 1)
            return true;
        else
            return false;
    }

    if(page_no === 2)
    {
        let flag3 = 1;
        let first_name = document.getElementById("first_name");
        let middle_name = document.getElementById("middle_name");
        let last_name = document.getElementById("last_name");

        if(validFirstName(first_name) === false)
                flag3 = 0;
        if(validMiddleName(middle_name) === false)
                flag3 = 0;
        if(validLastName(last_name) === false)
                flag3 = 0;

        if(flag3 === 1)
            return true;
        else
            return false;
    }
}

page_number = 0;
pages[0].classList.add("active"); 

progress_steps[page_number].classList.add("progress_step_active");

main_form.addEventListener("click", element => {

    if(element.target.matches("[step-next]"))
    {
        if(validateNext(page_number) === true)
        {
            pages[page_number].classList.remove("active");
            page_number += 1;
            pages[page_number].classList.add("active");

            progress_steps[page_number].classList.add("progress_step_active");
        }
    }
    else if(element.target.matches("[step-previous]"))
    {
        progress_steps[page_number].classList.remove("progress_step_active");
        pages[page_number].classList.remove("active");
        page_number -= 1;
        pages[page_number].classList.add("active");
    }
    
    const active_steps_count = [...document.querySelectorAll(".progress_step_active")];
    moving_bar.style.width = ((active_steps_count.length -1) / (progress_steps.length -1)) * 100 + "%";
});

main_form.addEventListener('submit', element = (event) => {

    event.preventDefault();
    
    if(validateNext(2) === true)
    {
        swal
        ({
            icon: "success",
            title: "Welcome!",
            text: "Registration Successful"
        });
    }
});