// set access to elements in HTML document

const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = []; // store all the tasks along with their associated data
let currentTask = {}; // track the state when editing and discarding tasks

// opening and closing the modal dialog box on the web page

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden"); // toggle method add the class if it is not present on the element, and remove the class if it is present on the element.
});

closeTaskFormBtn.addEventListener(
  "click",
  () => confirmCloseDialog.showModal() // showModal() method display a modal dialog box on a web page
);

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close() method to close a modal dialog box on a web page
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close the modal showing the Cancel and Discard buttons
  taskForm.classList.toggle("hidden"); // hide the form modal
});
