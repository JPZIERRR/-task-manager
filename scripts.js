'use strict';
const input = document.querySelector('.input');
const buttonAdd = document.querySelector('.add-task');
const error = document.querySelector('.empty-input-error');
const listContainer = document.querySelector('.list-task');

const idGenerator = function () {
  const id = Math.floor(Math.random() * 3000);
  return id;
};

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
  if (li) {
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
