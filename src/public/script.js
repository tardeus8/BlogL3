document.addEventListener("DOMContentLoaded", () => {
    initializeAuthForm();
    initializeLogoutForm();
    initializeCreatePostForm();
    initializedPostControlButtons();
})

function initializeAuthForm() {
    const authForm = document.getElementById("auth-form");
    if (!authForm) return;

    authForm?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const pressedButton = e.submitter;
        const action = pressedButton?.dataset.action;
        const endpoint = action === "login"
            ? "/api/users/login"
            : "/api/users/register";;

        const res = await sendForm(authForm, endpoint, "POST");
        const resBody = await res.json();
        console.log(resBody)
        if (res.ok) {
            window.location.reload();
        }
        else{
            const status = document.getElementById("auth-status");
            status.textContent = resBody.payload;
            status.style.display = "block"
            setTimeout(()=> {status.style.display = "none"}, 2000);
        }
    });
}

async function sendForm(form, endpoint, method) {
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    const json = JSON.stringify(data);
    console.log("fetch1");
    const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: json
    });
    return res;
}

function initializeLogoutForm() {
    const logoutForm = document.getElementById("logoutForm");
    if (!logoutForm) return;

    logoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const res = await fetch("/api/users/logout", {
            method: "POST",
        })

        if (res.ok) {
            window.location.reload();
        }
    })
}

function initializeCreatePostForm() {
    const createPostForm = document.getElementById("create-post-form");
    if (!createPostForm) return;

    createPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const res = await sendForm(createPostForm, "/api/posts/", "POST");
        if (res.ok) {
            window.location.reload();
        }
    })

}

function initializedPostControlButtons() {
    document.addEventListener("click", async (e) => {
        if (e.target.matches(".edit")) {
            const edit = e.target;
            const postElement = edit.closest(".post");
            const titleElement = postElement.querySelector(".post-header h3");
            const contentElement = postElement.querySelector(".post-content p");
            const {editForm, contentInput} = createPostEditForm(edit.dataset.id, postElement, titleElement, contentElement);
            postElement.replaceWith(editForm);
            contentInput.focus();
        }
        if (e.target.matches(".delete")) {
            const deleteBtn = e.target;
            const postElement = deleteBtn.closest(".post");
            const postID = deleteBtn.dataset.id;
            console.log("fetch3");
            const res = await fetch("/api/posts/" + postID, {
                method: "DELETE"
            })
            if (res.ok) postElement.remove();
        }
    });
}

function createPostEditForm(postID, originalPost, titleElement, contentElement) {
    const editForm = document.createElement("form");
    editForm.classList.add("post-edit");

    const postIDfield = document.createElement("input");
    postIDfield.type = "hidden";
    postIDfield.name = "postID";
    postIDfield.value = postID;

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.value = titleElement.textContent;

    const contentInput = document.createElement("textarea");
    contentInput.name = "content";
    contentInput.value = contentElement.textContent;

    const SaveBtn = document.createElement("button");
    SaveBtn.type = "submit";
    SaveBtn.textContent = "Save";
    SaveBtn.dataset.action = "save";
    SaveBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const res = await sendForm(editForm, `/api/posts/`, "PUT")
        if (res.ok) window.location.reload();
    })

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "submit";
    cancelBtn.textContent = "Cancel";
    cancelBtn.dataset.action = "cancel";
    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editForm.replaceWith(originalPost);
    })

    const headerDiv = document.createElement("div");
    headerDiv.appendChild(titleInput);
    headerDiv.classList.add("post-header");

    const contentDiv = document.createElement("div");
    contentDiv.append(contentInput)
    contentDiv.classList.add("post-content");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(SaveBtn);
    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.classList.add("post-controls");

    const mainDiv = document.createElement("div");
    mainDiv.append(contentDiv);
    mainDiv.append(buttonsDiv);
    mainDiv.classList.add("post-main");
    editForm.appendChild(postIDfield);
    editForm.appendChild(headerDiv);
    editForm.appendChild(mainDiv);
    return {editForm, contentInput};
}
