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

  register(type: string, parameters: any[] | null, task: Function) {
    //콜백과 콜백의 prams를 받아 TaskEvent를 생성하고 실행
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

    //유효한 태스크가 아닌 경우 버림
    if (!this.isValidTask(taskEvent) && this.queue.length !== 0) {
      this.execute()
      return;
    }

    //유효한 태스크의 경우 태스크 run, 재귀적으로 실행
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
    //태스크 이벤트가 정상적으로 생성되지 않은 경우
    if (taskEvent === undefined) {
      return false;
    }

    if (taskEvent.type === TASK_TYPE.PRIMARY) {
      return true;
    }

    //테스크가 생성된 시점과 excute 되는 시점의 차이가 스킵 단위보다 크면 정상적인 테스크
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