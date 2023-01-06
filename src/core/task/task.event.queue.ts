import TaskRunner from "./task.runner";

interface TaskEvent {
  type: string;
  createTime: number;
  runner: TaskRunner;
}

const TASK_TYPE = {
  PRIMARY: 'primary',
  EVENT: 'event'
}

const DEFAULT_EVENT_SKIP_UNIT = 50; // 0.05 sec

class TaskEventQueue {
  private queue: TaskEvent[]
  private isLooping: boolean;
  private eventSkipUnit: number;

  constructor() {
    this.queue = [];
    this.isLooping = false;
    this.eventSkipUnit = DEFAULT_EVENT_SKIP_UNIT
  }

  regist(type: string, parameters: any[] | null, task: Function) {
    this.queue.push(this.createTaskEvent(type, parameters, task))
    this.run()
  }

  private run() {
    if (this.isLooping === false) {
      this.changeStatus();
      this.execute();
    }
  }

  private execute() {
    if (this.queue.length === 0) {
      this.changeStatus();
      return;
    }

    let taskEvent = this.queue.shift()

    if (!this.isValidTask(taskEvent) && this.queue.length !== 0) {
      this.execute()
      return;
    }

    taskEvent?.runner.run()
    .then((value) => {
      // console.log(`task success: ${value}`)
      this.execute()
    })
    .catch(() => {
      console.log("task failed")
    })
  }

  private isValidTask(taskEvent: TaskEvent | undefined): boolean {
    if (taskEvent === undefined) {
      return false;
    }

    if (taskEvent.type === TASK_TYPE.PRIMARY) {
      return true;
    }

    if (taskEvent.createTime + this.eventSkipUnit > Date.now()) {
      return true;
    }

    return false;
  }

  private changeStatus() {
    this.isLooping = !this.isLooping
  }

  private createTaskEvent(type: string, parameters: any[] | null, task: Function): TaskEvent {
    return {
      type: type, 
      createTime: Date.now(),
      runner: TaskRunner.createTaskRunner(parameters, task)
    }
  }
}

export default TaskEventQueue;