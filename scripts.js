'use strict';
const input = document.querySelector('.input');
const buttonAdd = document.querySelector('.add-task');
const error = document.querySelector('.empty-input-error');
const listContainer = document.querySelector('.list-task');

/* Janela de edição */
const windowEdit = document.querySelector('.edit-window');
const windowBg = document.querySelector('.window-bg');
const updateButton = document.querySelector('.save-btn');
const closeButton = document.querySelector('.close-window');
const editIdTask = document.querySelector('.edit-id-task');
const inputNewTask = document.querySelector('.edit-input');

const idGenerator = function () {
  const id = Math.floor(Math.random() * 3000);
  return id;
};

/* Eventos */
input.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    e.preventDefault;
    const task = {
      name: input.value,
      id: idGenerator(),
    };

    addTask(task);
  }
});

buttonAdd.addEventListener('click', () => {
  const task = {
    name: input.value,
    id: idGenerator(),
  };

  addTask(task);
});

closeButton.addEventListener('click', () => {
  changeWindow();
});

updateButton.addEventListener('click', e => {
  e.preventDefault();

  const taskId = editIdTask.innerHTML.replace('#', '');

  const task = {
    name: inputNewTask.value,
    id: taskId,
  };

  const currentTask = document.getElementById(`${taskId}`);

  if (currentTask) {
    const li = createLi(task);
    listContainer.replaceChild(li, currentTask);
    changeWindow();
  }
});

inputNewTask.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    e.preventDefault();

    const taskId = editIdTask.innerHTML.replace('#', '');

    const task = {
      name: inputNewTask.value,
      id: taskId,
    };

    const currentTask = document.getElementById(`${taskId}`);

    if (currentTask) {
      const li = createLi(task);
      listContainer.replaceChild(li, currentTask);
      changeWindow();
    }
  }
});

/* Functions */
const addTask = function (task) {
  const li = createLi(task);
  listContainer.appendChild(li);
  input.value = '';
};

const createLi = function (task) {
  const li = document.createElement('li');
  li.id = task.id;

  const span = document.createElement('span');
  span.classList.add('task-text');
  span.innerHTML = task.name;

  const div = document.createElement('div');

  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.innerHTML = 'edit';
  editButton.setAttribute(`onClick`, `edit(${task.id})`);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.innerHTML = 'delete';
  deleteButton.setAttribute(`onClick`, `delet(${task.id})`);

  div.appendChild(editButton);
  div.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(div);
  return li;
};

const edit = function (idTask) {
  const li = document.getElementById(`${idTask}`);
  const span = document.querySelector('.task-text');
  if (li) {
    editIdTask.innerHTML = `#${idTask}`;
    inputNewTask.value = span.innerText;
    changeWindow();
  }
};

const delet = function (idTask) {
  const confirmation = window.confirm(
    'Tem certeza que deseja excluir essa tarefa?',
  );

  if (confirmation) {
    const li = document.getElementById(`${idTask}`);
    if (li) {
      listContainer.removeChild(li);
    }
  }
};

const changeWindow = function () {
  windowBg.classList.toggle('hidden');
  windowEdit.classList.toggle('hidden');
};
