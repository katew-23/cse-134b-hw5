const LOCAL_KEY = "projects-local-data";
const LOCAL_JSON_URL = "assets/data/projects-data.json";

async function loadProjectsArray() {
  // try localStorage first
  try {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.error("Error parsing localStorage projects:", err);
  }

  // fall back to the JSON file if nothing valid in localStorage
  try {
    const res = await fetch(LOCAL_JSON_URL);
    if (!res.ok) {
      console.warn("Could not fetch local JSON file for CRUD baseline.");
      return [];
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
      } catch (err) {
        console.error("Error writing baseline projects to localStorage:", err);
      }
      return data;
    }
  } catch (err) {
    console.error("Error fetching baseline projects JSON:", err);
  }

  return [];
}

function saveProjectsArray(projects) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error("Error saving projects to localStorage:", err);
  }
}

function findProjectIndexById(projects, id) {
  return projects.findIndex((p) => p.id === id);
}

function showMessage(container, text, type = "info") {
  if (!container) return;

  // Reset classes and text
  container.textContent = text;
  container.className = "form-messages";

  if (type === "error") {
    container.classList.add("form-error");
  } else {
    container.classList.add("form-info");
  }

  console.log("showMessage:", type, text);
}

function clearMessage(container) {
  if (!container) return;
  container.textContent = "";
  container.className = "form-messages";
}

document.addEventListener("DOMContentLoaded", () => {
    const saveForm = document.getElementById("saveForm");
    const deleteForm = document.getElementById("deleteForm");
    const saveMessages = document.getElementById("saveMessages");
    const deleteMessages = document.getElementById("deleteMessages");

    // CREATE / UPDATE
    if (saveForm) {
        saveForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            clearMessage(saveMessages);

            const id = saveForm.projId.value.trim();
            const title = saveForm.projTitle.value.trim();
            const link = saveForm.projLink.value.trim();
            const img = saveForm.projImage.value.trim();
            const imgSmall = saveForm.projImageSmall.value.trim();
            const imgAlt = saveForm.projAlt.value.trim();
            const description = saveForm.projDescription.value.trim();

            if (!id) {
                showMessage(saveMessages, "Project ID is required.", "error");
                return;
            }

            let projects = await loadProjectsArray();
            const idx = findProjectIndexById(projects, id);

            if (idx !== -1) {
                //update exsiting prpoject
                const existing = projects[idx];

                if (title) existing.title = title;
                if (link) existing.link = link;
                if (img) existing.img = img;
                if (imgSmall) existing.imgSmall = imgSmall;
                if (imgAlt) existing.imgAlt = imgAlt;
                if (description) existing.description = description;

                saveProjectsArray(projects);

                showMessage(
                    saveMessages,
                    `Updated project "${id}". Only fields you entered were changed.`,
                    "info"
                );

                saveForm.reset();
                return;
            }

            // create new project
            if (!title || !img || !imgAlt || !description) {
                showMessage(
                    saveMessages,
                    "To create a new project, you must provide at least: title, main image URL, alt text, and description.",
                    "error"
                );
                return;
            }

            const newProject = {
                id,
                title,
                link: link || "",
                img,
                imgSmall: imgSmall || img, // fallback
                imgAlt,
                description
            };

            projects.push(newProject);
            saveProjectsArray(projects);

            showMessage(saveMessages, `Created new project "${id}".`, "info");
            saveForm.reset();

        });
    }

  // DELETE
  if (deleteForm) {
    deleteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearMessage(deleteMessages);

      const idToDelete = deleteForm.deleteId.value.trim();

      if (!idToDelete) {
        showMessage(deleteMessages, "Please enter a project ID to delete.", "error");
        return;
      }

      let projects = await loadProjectsArray();
      const idx = findProjectIndexById(projects, idToDelete);

      if (idx === -1) {
        showMessage(
          deleteMessages,
          `No project found with ID "${idToDelete}". Check for typos and try again.`,
          "error"
        );
        return;
      }

      const [removed] = projects.splice(idx, 1);
      saveProjectsArray(projects);

      showMessage(
        deleteMessages,
        `Deleted project "${removed.id}".`,
        "info"
      );

      deleteForm.reset();
    });
  }
});
