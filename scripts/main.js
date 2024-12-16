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

  renderPage();

  inputElement.value = '';
});

function renderPage() {
  let todoHTML = '';

  taskTodo.forEach((value, index) => {
    todoHTML += `
      <li>
        <p>${value['task-name']}</p>
        <button class="done-button js-done-button" data-button-id="${index}">Selesai</button>
      </li>
    `;
  });

  document.querySelector('.list-task').innerHTML = todoHTML;
}

renderPage();

const completedTask = [];
const activeButton = document.querySelectorAll('.js-done-button');

function completedRenderPage() {
  let todoHTML = '';

  completedTask.forEach((value, index) => {
    todoHTML += `
      <li>
        <p>${value['task-name']}</p>
        <button class="delete-button js-delete-button" data-button-id="${index}">Hapus</button>
      </li>
    `;
    
    document.querySelector('.list-task-compeleted').innerHTML = todoHTML;
  });

  console.log(todoHTML);
}

activeButton.forEach((button) => {
  button.addEventListener('click', () => {
    const { buttonId } = button.dataset;
    const taskCompleted = taskTodo[buttonId];

    taskTodo.splice(buttonId, 1);

    taskCompleted.status = true;
    completedTask.push(taskCompleted);

    completedRenderPage();

    renderPage();
  });
});