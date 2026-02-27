let user_grid = document.getElementById("userGrid");
let view_toggle_button = document.getElementById("viewToggleBtn");
let delete_id_input = document.getElementById("deleteIdInput");
let delete_btn = document.getElementById("deleteBtn");
let sort_by_group_btn = document.getElementById("sortByGroupBtn");
let sort_by_id_btn = document.getElementById("sortByIdBtn");
let users = [];

window.onload = function() {
    retrieveData();
};

async function retrieveData() {
    try{
        const response = await fetch("https://69a1de622e82ee536fa26b78.mockapi.io/user_api")
        const data = await response.json()
        users = data;
        console.log("Data retrieved successfully:", users);
        await render(users);        
    }catch (error){
        console.error(error);
    }
}

async function render(users) {
    user_grid.innerHTML= ""
    users.forEach(user => {
        user_grid.innerHTML += `<article class="user-card">
<h3>${user.first_name ?? ""}</h3>
<p>first_name: ${user.first_name ?? ""}</p>
<p>user_group: ${user.user_group ?? ""}</p>
<p>id: ${user.id ?? ""}</p>
</article>
` });
}

view_toggle_button.addEventListener("click", function() { 
    if (user_grid.classList.contains("grid-view")) {    
        user_grid.classList.remove("grid-view");
        user_grid.classList.add("list-view");
    } else if (user_grid.classList.contains("list-view")) {
        user_grid.classList.remove("list-view");
        user_grid.classList.add("grid-view");
    }
});

sort_by_group_btn.addEventListener("click", async function() {
    users.sort((a, b) => {
        if (a.user_group < b.user_group) return -1;
        if (a.user_group > b.user_group) return 1;
        return 0;
    });
    await render(users);
});

sort_by_id_btn.addEventListener("click", async function() {
    users.sort((a, b) => a.id - b.id);
    await render(users);
});

delete_btn.addEventListener("click", async function() {
    const idToDelete = delete_id_input.value;
    try {
        const response = await fetch(`https://69a1de622e82ee536fa26b78.mockapi.io/user_api/${idToDelete}`, {
            method: "DELETE"
        });
        if (response.ok) {
            console.log(`User with id ${idToDelete} deleted successfully.`);
            retrieveData();
        } else {
            console.error(`Failed to delete user with id ${idToDelete}. Status: ${response.status}`);
        }
        await render(users);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
});