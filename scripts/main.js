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

  taskTodo.forEach((value) => {
    todoHTML += `
      <li>
        <p>${value['task-name']}</p>
        <button class="done-button">Selesai</button>
      </li>
    `;
  });

  document.querySelector('.list-task').innerHTML = todoHTML;
}

renderPage();