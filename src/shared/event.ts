import { isArray, isFunction } from "./utils";

interface EventList {
    [propName:string]: Function|Function[]
}

interface EventBus {
    on: (subscriber: string, callback: () => void) => void;
    off: (subscriber: string, callback: () => void) => void;
    emit: (subscriber: string, data: []) => void;
}

class EventBusImpl implements EventBus {
    private readonly event_list: EventList;
    constructor(){
        this.event_list = {}
    }
    on(subscriber: string, callback: () => void) {
        let ctx: Array<Function> | Function;
        ctx = this.event_list[subscriber];
        if (!ctx) {
            this.event_list[subscriber] = callback;
        } else if (isFunction(ctx)) {
         this.event_list[subscriber] = [<Function>ctx, callback];
        } else if (isArray(ctx)) {
            (<Function[]>ctx).push(callback);
        }
    };

    off(subscriber: string, callback: () => void) {
        let ctx: Function | Function[];
        ctx = this.event_list[subscriber];
        if (callback) {
            if (isFunction(ctx)) {
                if (ctx === callback) {
                    delete this.event_list[subscriber];
                }
            } else if (isArray(ctx)) {
                this.event_list[subscriber] = (ctx as Function[]).filter((item) => {
                    return item !== callback;
                });
            }
        } else {
            if (ctx) {
                delete this.event_list[subscriber];
            }
        }
    };

    emit(subscriber: string, ..._rest: any[]) {
        let ctx: Function | Function[];
        ctx = this.event_list[subscriber];
        if (!ctx) {
            return false
        } else if (isFunction(ctx)) {
            (<Function>ctx).apply(this, _rest);
        } else if (isArray(ctx)) {
            (<Function[]>ctx).forEach((func: Function) => {
                func.apply(this, _rest);
            })

        };
    }

}

let eventBus = new EventBusImpl();
export default eventBus;
