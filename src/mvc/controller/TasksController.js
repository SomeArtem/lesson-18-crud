import TaskVO from "../model/vo/TaskVO";

class TasksController{
    
    #model;
    constructor(model){
        this.#model=model;
    }

    async retrieveTasks(){
        this.#model.tasks = await fetch('http://localhost:3000/tasks')
        .then((response) => response.ok && response.json())
        .then((rawTasks) => {
          if (rawTasks && rawTasks instanceof Array) {
            console.log('json', rawTasks);
            return rawTasks.map((json) => TaskVO.fromJSON(json));
          } else{
            window.alert('Problem with data parsing');
            return [];
          }
        })
        .catch((e)=>{
          window.alert('Problem with data server' + e.toString());
          return [];
        });        
    };

    createTask(taskTitle, taskDate, taskTag) {
        console.log('> Create task -> On Confirm');

        fetch('http://localhost:3000/tasks',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"title":taskTitle, "date":taskDate, "tag": taskTag}),
        });
        const taskId = `task_${Date.now()}`;
        const taskVO = new TaskVO(taskId, taskTitle, taskDate, taskTag);

        // renderTask(taskVO);
        // tasks.push(taskVO);

        // saveTask();
      }

}

export default TasksController;