const inputElement = document.querySelector('.task-todo');
const buttonElement = document.querySelector('.add-button-todo');

buttonElement.addEventListener('click', () => {
  const value = inputElement.value;

  if (!value) {
    alert('Wajib diisi! 😡');

    return;
  } else {
    taskTodo.push({
      'task-name': value,
      status: false
    });
  }

  saveDataTaskActive();

  renderPage();

  inputElement.value = '';

  location.reload();
});

function renderPage() {
  let todoHTML = '';

  taskTodo.forEach((value, index) => {
    todoHTML += `
      <li>
        <p>${value['task-name']}</p>
        <button class="done-button js-done-button" data-button-id="${index}"><img src="./assets/icons/check.png" alt="checked"/></button>

        <span></span>
      </li>
    `;
  });

  document.querySelector('.list-task').innerHTML = todoHTML;
}

renderPage();

const completedTask = JSON.parse(localStorage.getItem('todo-completed')) || [];

const activeButton = document.querySelectorAll('.js-done-button');

activeButton.forEach((button) => {
  button.addEventListener('click', () => {
    const { buttonId } = button.dataset;
    const taskCompleted = taskTodo[buttonId];

    taskTodo.splice(buttonId, 1);

    saveDataTaskActive();

    taskCompleted.status = true;
    
    completedTask.push(taskCompleted);

    saveDataTaskCompleted();

    completedRenderPage();

    renderPage();

    location.reload();
  });
});

function completedRenderPage() {
  let todoHTML = '';

  completedTask.forEach((value, index) => {
    todoHTML += `
      <li>
        <p>${value['task-name']}</p>
        <button class="delete-button js-delete-button" data-button-id="${index}"><img src="./assets/icons/recycle-bin.png"/></button>
        <span></span>
      </li>
    `;
    
    document.querySelector('.list-task-completed').innerHTML = todoHTML;
  });
}

completedRenderPage();

const deleteButtonElement = document.querySelectorAll('.js-delete-button');

deleteButtonElement.forEach((button) => {
  button.addEventListener('click', () => {
    const { buttonId } = button.dataset;
    const index = Number(buttonId);

    const deleteMessage = confirm('Serius pengen menghilangkan masa lalu?');

    if (!deleteMessage) {
      return;
    } else {
      if (index !== -1 || index < 0) {
        completedTask.splice(index, 1);
      }
    }

    saveDataTaskCompleted();

    completedRenderPage();

    location.reload();
  });
});

function saveDataTaskActive() {
  localStorage.setItem('todo-application', JSON.stringify(taskTodo));
}

function saveDataTaskCompleted() {
  localStorage.setItem('todo-completed', JSON.stringify(completedTask));
}