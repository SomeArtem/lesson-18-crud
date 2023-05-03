import 'uno.css';
import '@unocss/reset/tailwind.css';
import "toastify-js/src/toastify.css";
import DOM from './src/constants/dom';
import { delay } from './src/utils/timeUtils';
import Toastify from 'toastify-js';
import TasksModel from './src/mvc/model/TasksModel';
import NetworkService from './src/service/NetworkService';
import TasksController from './src/mvc/controller/TasksController';


const KEY_LOCAL_TASKS = 'tasks';

const Tags = ['Web', 'Update', 'Design', 'Content'];



const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(DOM.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;

const tasksModel=new TasksModel();
const networkService=new NetworkService('http://localhost:3000');
const tasksController=new TasksController(tasksModel, networkService);


domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, DOM.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
  return domTaskClone;
}

const showToastWithText=(text)=>Toastify({
  text: text,
  duration:3000,
  close: true,  
}).showToast();

//const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

async function main() {
  
  tasksModel.addUpdateCallback((tasks)=>{
    domTaskColumn.innerHTML='';
    tasks.forEach((taskVO) =>  renderTask(taskVO) );
  });

  tasksController
    .retrieveTasks()
    .then(()=>{})
    .catch((e)=>{});



  // tasks.forEach((taskVO) => { renderTask(taskVO) });

  const taskOperations = {
    [DOM.Button.CREATE_TASK]: ()=>{
      renderTaskPopup(
        null,
        'Create task',
        'Create',
        (taskTitle, taskDate, taskTag) => {
          console.log('> Create task -> On Confirm');
          tasksController.createTask(taskTitle, taskDate, taskTag)
          .then((taskVO)=>{
            console.log('> Create task -> task added suxassfuly');
            showToastWithText(`your task saved.title: ${taskVO.title}`);
          })
          .catch((err)=>{
            console.log('> Create task -> task add error', err);
            window.alert(`error on server ${err.toString()}`);
          });
        }
      );
    },
    [DOM.Template.Task.BTN_DELETE]: (taskId) => {
      const taskVO=tasksModel.getTaskById(taskId);
      renderTaskPopup(taskVO, "Confirm delete task", "Delete", (taskTitle, taskDate, taskTag) => {
        console.log("> Delete task -> On Confirm", {
          taskTitle,
          taskDate,
          taskTag,
        });
        tasksController.deleteTask(taskId).then(()=>{
          console.log('> deleteTask -> task deleteT suxassfuly');
          showToastWithText(`your task deleted. title: ${taskVO.title}`);

        });
        // tasks.splice(tasks.indexOf(taskVO), 1);
        // domTaskColumn.removeChild(domTask);
        // saveTask();
      });
    },
    [DOM.Template.Task.BTN_EDIT]: (taskId) => {
      const taskVO=tasksModel.getTaskById(taskId);
      renderTaskPopup(
        taskVO,
        'Update task',
        'Update',
        (taskTitle, taskDate, taskTag) => {
          console.log('> Update task -> On Confirm', {
            taskTitle,
            taskDate,
            taskTag,
          });
          tasksController.updateTaskById(taskId, taskTitle, taskDate, taskTag);
          // taskVO.title = taskTitle;
          // const domTaskUpdated = renderTask(taskVO);
          // domTaskColumn.replaceChild(domTaskUpdated, domTask);
          // saveTask();
        }
      );
    },
  };

  domTaskColumn.onclick = (e) => {
    e.stopPropagation();
    console.log('domTaskColumn', e.target);
    const domTaskElement = e.target;
    const taskBtn = domTaskElement.dataset.btn;

    const isNotTaskBtn = !taskBtn;
    if (isNotTaskBtn) return;

    const allowedButtons = [
      DOM.Template.Task.BTN_EDIT,
      DOM.Template.Task.BTN_DELETE,
    ];
    if (!allowedButtons.includes(taskBtn)) return;

    let taskId;
    let domTask = domTaskElement;
    do {
      domTask = domTask.parentNode;
      taskId = domTask.dataset.id;
    } while (!taskId);

    // const taskVO = tasks.find((task) => task.id === taskId);
    // console.log('> taskVO:', taskVO);

    const taskOperation = taskOperations[taskBtn];
    if (taskOperation) {
      taskOperation(taskId);//было taskVO, domTask
    }
  };

  getDOM(DOM.Button.CREATE_TASK).addEventListener('click', taskOperations[DOM.Button.CREATE_TASK]);


  async function renderTaskPopup(
    taskVO,
    popupTitle,
    confirmText,
    processDataCallback
  ) {
    const domPopupContainer = getDOM(DOM.Popup.CONTAINER);
    const domSpinner = domPopupContainer.querySelector('.spinner');

    domPopupContainer.classList.remove('hidden');

    const onClosePopup = () => {
      domPopupContainer.children[0].remove();
      domPopupContainer.append(domSpinner);
      domPopupContainer.classList.add('hidden');
    };

    const TaskPopup = (await import('./src/mvc/view/popup/TaskPopup')).default;
    const taskPopupInstance = new TaskPopup(
      popupTitle,
      Tags,
      confirmText,
      (taskTitle, taskDate, taskTags) => {
        console.log('Main -> renderTaskPopup: confirmCallback', {
          taskTitle,
          taskDate,
          taskTags,
        });
        processDataCallback(taskTitle, taskDate, taskTags);
        onClosePopup();
      },
      onClosePopup
    );

    if (taskVO) {
      taskPopupInstance.taskTitle = taskVO.title;
    }

    delay(1000).then(() => {
      console.log('render 1');
      domSpinner.remove();
      document.onkeyup = (e) => {
        if (e.key === 'Escape') {
          onClosePopup();
        }
      };
      domPopupContainer.append(taskPopupInstance.render());
    });

  }

  function saveTask() {
    localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
  }  
}


main();



