const LOCAL_KEY = "projects-local-data";
const LOCAL_JSON_URL = "assets/data/projects-data.json";

const REMOTE_URL = "https://api.jsonbin.io/v3/b/6935c92e43b1c97be9de1476/latest?meta=false";
const REMOTE_HEADERS = {};

function createCardFromData(project) {
    const card = document.createElement("project-card");

    if (project.title) card.setAttribute("data-title", project.title);
    if (project.link) card.setAttribute("data-link", project.link);
    if (project.img) card.setAttribute("data-img", project.img);
    if (project.imgSmall) card.setAttribute("data-img-small", project.imgSmall);
    if (project.imgAlt) card.setAttribute("data-img-alt", project.imgAlt);
    if (project.description) card.setAttribute("data-description", project.description);

    return card;
}

function renderProjects(list) {
    const grid = document.querySelector("#projectsGrid");
    grid.innerHTML = "";

    list.forEach(project => {
        grid.appendChild(createCardFromData(project));
    });

    console.log("Finished rendering", list.length, "projects");
}

async function handleLoadLocal() {
   try {
        let data;

        const stored = localStorage.getItem(LOCAL_KEY);

        if (stored) {
            data = JSON.parse(stored);
        }

        if (!stored || !Array.isArray(data)) {
            const res = await fetch(LOCAL_JSON_URL);
            if (!res.ok) throw new Error("Failed to fetch local JSON file");

            data = await res.json();

            if (!Array.isArray(data)) throw new Error("JSON file must contain an array");

            localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
            console.log("Saved local JSON data to localStorage");
        }

        console.log("Rendering local projects:", data);
        renderProjects(data);

    } catch (err) {
        console.error(err);
        alert("Unable to load local data.");
    }
}

async function handleLoadRemote() {
    try {
        const res = await fetch(REMOTE_URL, {
            headers: REMOTE_HEADERS
        });

        if (!res.ok) throw new Error("Remote fetch failed");

        const json = await res.json();

        const data = Array.isArray(json) ? json : json.record;

        if (!Array.isArray(data)) throw new Error("Remote JSON must be an array");

        console.log("Rendering remote projects...");
        renderProjects(data);

    } catch (err) {
        console.error(err);
        alert("Unable to load remote data.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loadLocalBtn")
        .addEventListener("click", handleLoadLocal);

    document.getElementById("loadRemoteBtn")
        .addEventListener("click", handleLoadRemote);
});