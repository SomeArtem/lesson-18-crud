import TaskVO from "../model/vo/TaskVO";


class TasksController{
    
    #model;
    #networkService;    
    constructor(model, networkService){
        this.#model=model;
        this.#networkService=networkService;
    }

    async retrieveTasks(){
      try {
        this.#model.tasks = await this.#networkService.retrieveFromPath('tasks')
        //this.#model.tasks = await fetch('http://localhost:3000/tasks')
        //.then((response) => response.ok && response.json())
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
      } catch (err) {
        throw err        
      }       
    };

    deleteTask(taskId){
      console.log('> TasksController -> deleteTask, taskId= ',taskId);
        // tasks.splice(tasks.indexOf(taskVO), 1);
        // domTaskColumn.removeChild(domTask);
        // saveTask();

      return fetch(`http://localhost:3000/tasks/${taskId}`,{
        method:'DELETE'
      }).then((response)=>{
        console.log('TasksController-deleteTask: response= ', response.ok);
        if (response.ok){
          this.#model.deleteTaskById(taskId);          
        }        
      }).catch((e)=>{
        console.error('TasksController-deleteTask: error= ', e);
        throw new Error(e.toString());
      });
    }

    createTask(taskTitle, taskDate, taskTag) {
        console.log('> Create task -> On Confirm');

        return fetch('http://localhost:3000/tasks',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"title":taskTitle, "date":taskDate, "tag": taskTag}),
        }).then((response)=> response.json())
        .then((data)=>{
          console.log('TasksController-createTask: data= ', data);
          const taskVO = TaskVO.fromJSON(data);
          this.#model.addTask(taskVO);
          return taskVO;
        }).catch((e)=>{
          console.error('TasksController-createTask: error= ', e);
          throw new Error(e.toString());
        });
        //const taskId = `task_${Date.now()}`;
        

        // renderTask(taskVO);
        // tasks.push(taskVO);

        // saveTask();
    }

    updateTaskById(taskId, taskTitle, taskDate, taskTag){
      console.log('> TasksController -> updateTaskById, taskId= ',taskId);

    return fetch(`http://localhost:3000/tasks/${taskId}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify({"title":taskTitle, "date":taskDate, "tag": taskTag}),
      }).then((response)=> response.json())
      .then((data)=>{
        console.log('TasksController-updateTaskById: response= ', data);
        const taskVO=TaskVO.fromJSON(data);
        this.#model.updateTask(taskId, taskVO);

      }).catch((e)=>{
        console.error('TasksController-updateTaskById: error= ', e);
      });
    }

}

export default TasksController;