'use strict';

/* ICONS */
const iconPen =
  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAghJREFUSEvl1snLTmEYx/HPG0sLykyZk6TsDGXa+QOsFGWIsGGHDdmwEUpYmBb8EVZmsZKhSAoZQ8RCidCl6+g4nvk9T+/CvXnuznB9z+93X8MzYIjWwBBx9Qs8HPNwH98aiesHeAouYDYeYiWeVeF1gwN6HZNKoBdYgqdleJ3g6biKiQm4jGW5D8WL8LqA1wUO6A2My8AHsAv7sTOvncH6OsGzcA1jM+gtLCzZehML8BUj8D3uDVZxVWnB24c9FcVnsa4OxZG1lzA+gx3BqlJiXcSKvPcyVcfv79Wr4oBG8lTPdGom2OR+ZPWcVFqcaSTQ7hLoKLaVlEYpPRlsHYfSSKTRGegwdpSC7s2zjUsN67cXq9tBo2xCfaw3Wbd/NY1eGsjctLdQehxbS4Gq0LD3cdXebsEBjY40Kl+sQrfjUElpW2gnWd0N9B0Wt1PayRlXoaexoWRXWWlAl+Y0auXwn3vN6rgRdCN+5ptbcCz3XUNbWf0cRRM4iU0laNRo1GqsgMYEetCRzNJDjRRH03+Uz5zD2iZK36e9XUObKd6MEwmejzu5j5F2KvcfsBz3ulXaKrnOYzXeZi8egzU4WBe0meJXmIBP+JL74kM/5sQpXOhV8D/TaUaLOgxo2Hu3Z1qL5JqZtTgMn3Elx1/M1tv4UQe0mdXTMDKTqjZQ9YN7/SMwaOH/H/gX8oxyHyld2yAAAAAASUVORK5CYII="/>';

const iconTrash =
  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAARpJREFUSEvtlkGuAUEQhj+xsuIIjiAu8DgDCwvCDSRij7UFRyBsJJwBFxBHcARWb4dUYqQyjNY9k4xF13K6q77uv6qnKkNKlkmJiw04C/SBXMRh/4ExcP3mMjbgKdA1BJ0AvSTBbWD2TUCgAaxMe8M3rgBbk5PjehXYBb4/Ay4CHccbmdwkVaeoG2vnElAwRTOsn4Hjuz2fqlry8RcTvAekbl7Mg7UkYalHj0WRLpwCkTR4KgMVJBGpg7QMAR1cOHIo+S528+C4Ve2l1gr64grU8O/4WRc2TUImCDHp1zIKaZur0UhPMIlI7dIhncBroOZCUz4boG7752oCi5jgFrC0Bcv+8qMF5i0PcAFE5kOUn81Ab8n+vD018B1Y2lofc0pDAwAAAABJRU5ErkJggg=="/>';

///////////////////////////////////////////

/* Seletores */
const input = document.querySelector('.input');
const buttonAdd = document.querySelector('.add-task');
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
    const task = {
      name: input.value,
      id: idGenerator(),
    };
    if (task.name === '') {
      return;
    }
    addTask(task);
  }
});

buttonAdd.addEventListener('click', () => {
  const task = {
    name: input.value,
    id: idGenerator(),
  };
  if (task.name === '') {
    return;
  }
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

  if (task.name === '') {
    return;
  }

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

    if (task.name === '') {
      return;
    }

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
  li.classList.add('list');

  const span = document.createElement('span');
  span.classList.add('task-text');
  span.innerHTML = task.name;

  const div = document.createElement('div');

  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.innerHTML = iconPen;
  editButton.setAttribute(`onClick`, `edit(${task.id})`);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.innerHTML = iconTrash;
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
    editIdTask.innerHTML = `#${idTask}`;
    inputNewTask.value = li.innerText;
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
