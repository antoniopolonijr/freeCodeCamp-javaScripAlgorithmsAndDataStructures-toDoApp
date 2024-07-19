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

// The function to add the input values to taskData
const addOrUpdateTask = () => {
  // determine whether the task being added to the taskData array already exists or not. If the task does not exist, you will add it to the array. If it does exist, you will update it.
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id); // The findIndex() array method finds and returns the index of the first element in an array that meets the criteria specified by a provided testing function. If no such element is found, the method returns -1

  // When a user creates a task, it should be saved in an object.
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`, // add title to the object / For the id, the value should be all lowercase. / the final result should be a hyphenated string, split the string into an array of words / the join method to turn the result back into a string / To make the id more unique, add another hyphen and use Date.now() (returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC)
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // Now that you have obtained the values from the input fields and generated an id, you want to add them to your taskData array to keep track of each task. However, you should only do this if the task is new. If the task already exists, you will set it up for editing. This is why you have the dataArrIndex variable, which provides the index of each task.
  if (dataArrIndex === -1) {
    // dataArrIndex variable, which provides the index of each task.
    taskData.unshift(taskObj); // add the taskObj object to the beginning of the taskData array.
  } // unshift() is an array method that is used to add one or more elements to the beginning of an array.

  updateTaskContainer(); // responsible for adding the tasks to the DOM.

  // If you attempt to add another task now, you'll notice that the input fields retain the values you entered for the previous task. To resolve this, you need to clear the input fields after adding a task.
  // Instead of clearing the input fields one by one, it's a good practice to create a function that handles clearing those fields. You can then call this function whenever you need to clear the input fields again. (reset function)
  reset();
};

// The function responsible for adding the tasks to the DOM.
const updateTaskContainer = () => {
  //If you add a task, and then add another, the previous task gets duplicated. This means you need to clear out the existing contents of tasksContainer before adding a new task.
  tasksContainer.innerHTML = "";

  // display the task on the page by looping through it.
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `<div class="task" id="${id}">
  <p><strong>Title:</strong> ${title}</p>
  <p><strong>Date:</strong> ${date}</p>
  <p><strong>Description:</strong> ${description}</p>
  <button type="button" class="btn">Edit</button>
    <button type="button" class="btn">Delete</button>
  </div>`; // template strings (${}) to set the parameter you destructured from the task data. / To allow for task management, you need to include both a delete and an edit button for each task.
  });
};

// reset function to clear the input fields
const reset = () => {
  titleInput.value = ""; // clear the input field
  dateInput.value = ""; // clear the input field
  descriptionInput.value = ""; // clear the input field
  taskForm.classList.toggle("hidden"); //  hide the form modal for the user to see the added task
  currentTask = {}; // That's because at this point, currentTask will be filled with the task the user might have added.
};

// opening and closing the modal dialog box on the web page
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden"); // toggle method add the class if it is not present on the element, and remove the class if it is present on the element.
});

// You should display the Cancel and Discard buttons to the user only if there is some text present in the input fields.
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value; // variable to check if there is a value in the titleInput field or the dateInput field or the descriptionInput field.

  if (formInputsContainValues) {
    // If formInputsContainValues is true, indicating that there are changes
    confirmCloseDialog.showModal(); // showModal() method display a modal dialog box on a web page
  } else {
    // Otherwise, if there are no changes
    reset(); // call the reset() function to clear the input fields and hide the form modal.
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close() method to close a modal dialog box on a web page
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // close the modal showing the Cancel and Discard buttons
  reset(); // (removed the existing code toggling the class hidden on taskForm and call the reset function instead) That's because when you click the Discard button, everything in the input fields should go away.
});

// get the values from the input fields, save them into the taskData array, and display them on the page.
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // method to stop the browser from refreshing the page after submitting the form.

  // You can enhance code readability and maintainability by refactoring the submit event listener into two separate functions. The first function can be used to add the input values to taskData (addOrUpdateTask function), while the second function can be responsible for adding the tasks to the DOM. (updateTaskContainer function (inside of addOrUpdateTask funcition))
  addOrUpdateTask();
});
