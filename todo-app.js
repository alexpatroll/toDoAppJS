(function() {

  let items = [];
// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
let appTitle = document.createElement('h2');
appTitle.innerHTML = title;
return appTitle;
}

//создаем и возвращаем форму для создания дела и кнопки
function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

form.classList.add('input-group', 'mb-3');
input.classList.add('form-control');
input.placeholder = 'Введите название нового дела';
buttonWrapper.classList.add('input-group-append');
button.classList.add('btn', 'btn-primary');
button.textContent = 'Добавить дело';
button.setAttribute('disabled', 'disabled');

buttonWrapper.append(button);
form.append(input);
form.append(buttonWrapper);


return {
  form,
  input,
  button,
};
}

// создаем и возвращаем список элементов
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

// функция создания дела
function createTodoItem(obj, keyApp) {

  let item = document.createElement('li');
  //кнопки помещаем в элемент, который красиво покажет их в одной группе:
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

// устанавливаем стили для элемента списка и для рамещения кнопок в правой части с помощью флекс
item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
item.textContent = obj.name;

buttonGroup.classList.add('btn-group', 'btn-group-sm');
doneButton.classList.add('btn', 'btn-success');
doneButton.textContent = 'Готово';
deleteButton.classList.add('btn', 'btn-danger');
deleteButton.textContent = 'Удалить';

//вкладываем кнопки в отдельный элемент, что бы они обьедиились в один блок
buttonGroup.append(doneButton);
buttonGroup.append(deleteButton);
item.append(buttonGroup);


//пушим в массив обьекты
items.push(obj)
console.log(items);
localStorage.setItem(keyApp, JSON.stringify(items)); // записываем в LS

// обработчики для кнопок:
//done
doneButton.addEventListener('click', function() {
item.classList.contains('list-group-item-success') ? item.classList.remove('list-group-item-success') : item.classList.toggle('list-group-item-success')

let findArrDone = items.find(item => item.name == obj.name); //находим в массиве индекс элемента

//items.splice(findArr, 1);
console.log(findArrDone.done)
findArrDone['done'] === true ? findArrDone['done'] = false : findArrDone['done'] =true
console.log(findArrDone.done)
localStorage.setItem(keyApp, JSON.stringify(items)); // записываем в LS

});

//delete
deleteButton.addEventListener('click', function() {
  if (confirm('Уверены?')) {
      item.remove()
let findArr = items.findIndex(item => item.name == obj.name); //находим в массиве  инд элемента который удаляем
items.splice(findArr, 1);
console.log(items)
localStorage.setItem(keyApp, JSON.stringify(items)); // записываем в LS
}});




//доступ к элементу и кнопкам что бы обрабатывать события нажатия
return {
item,
doneButton,
deleteButton,
};
}

// функция создания контейнера, заголовка, массива
function createTodoApp(container, title, arr, keyApp) {
  let data = localStorage.getItem(keyApp) ? JSON.parse(localStorage.getItem(keyApp)) : arr

  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();


  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);


  // идем по дефолтному списку
for (let el of data) {   //идем по дефолтному массиву
let newItem = createTodoItem(el, keyApp); //создаем дело из элемента дефолтного массива
el.done === true ? newItem.item.classList.toggle('list-group-item-success') : newItem.item // если в св-ве done true меняем класс
todoList.append(newItem.item);
};


  //добавляем на событие инпут атрибут для кнопки
  todoItemForm.input.addEventListener('input', function() {
    setInterval(function() {
!todoItemForm.input.value ? todoItemForm.button.disabled = true : todoItemForm.button.disabled = false
     }, 300) });

  //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', function(e) {

    //что бы страница не перезагружалась при отправке формы
    e.preventDefault();

    //игнориурем создание элемента если пользователь ничего не ввел
    if (!todoItemForm.input.value) {
      return;
    }

    let item = {name: todoItemForm.input.value,
      done: false};


 let todoItem = createTodoItem(item, keyApp);
  // создаем и добавляем в список новое дело с названием из поля для ввода


  todoList.append(todoItem.item);

  //обнуляем значение в поле что бы не стирать его в ручную
  todoItemForm.input.value = '';


  });


};




//добавляем в окно что бы открывать в других вкладках
window.createTodoApp = createTodoApp;

})();
