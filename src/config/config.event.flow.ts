import { EventFlow } from '../type'

const DEFAULT_EVENT_TYPE = 'none';

class EventFlowConfig {
  type: string = DEFAULT_EVENT_TYPE;

  constructor(flow: EventFlow | undefined) {
    if (flow !== undefined) {
      this.type = flow.type ?? DEFAULT_EVENT_TYPE
    }
  }
}

export default EventFlowConfig;