const BASE_PARAMETERS: any[] = []

class TaskRunner {
  parameters: any[];
  task: Function;

  constructor(parameters: any[] | null, task: Function) {
    this.parameters = parameters ?? BASE_PARAMETERS;
    this.task = task;
  }

  static buildTaskRunner(parameters: any[] | null, task: Function) {
    return new TaskRunner(parameters, task);
  }

  run(): Promise<unknown> {
    if (this.parameters.length === 0) {
      return this.task()
    }
    return this.task(...this.parameters)
  }
}

export default TaskRunner;