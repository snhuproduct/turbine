import { Injectable } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';

const MILLISECOND = 1000;
const EVENT_KEEPALIVE = 'keepAlive';
const EVENT_INACTIVE = 'inactive';
const EVENT_WARNING = 'warning';
const EVENT_ACTIVITY = 'activity';

interface IRefreshTokenTimer {
  inactivity?: ReturnType<typeof setInterval> | null;
  keepAlive?: ReturnType<typeof setInterval> | null;
}

@Injectable()
export class ActivityMonitorService {
  options = {
    enabled: false /* is the ActivityMonitor enabled? */,
    keepAlive: 3000 /* keepAlive ping interval (seconds) */,
    inactive: 3600 /* how long until user is considered inactive? (seconds) */,
    warning: 600 /* when to warn user when nearing inactive state (deducted from inactive in seconds) */,
    monitor: 3 /* how frequently to check if the user is inactive (seconds) */,
    disableOnInactive:
      true /* by default, once user becomes inactive, all listeners are detached */,
    DOMevents: [
      'mousemove',
      'mousedown',
      'mouseup',
      'keypress',
      'wheel',
      'touchstart',
      'scroll',
    ] /* list of DOM events to determine user's activity */,
  };

  user = {
    action: Date.now() /* timestamp of the users' last action */,
    active: true /* is the user considered active? */,
    warning: false /* is the user in warning state? */,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: Record<string, any> = {
    [EVENT_KEEPALIVE]:
      {} /* functions to invoke along with ping (options.frequency) */,
    [EVENT_INACTIVE]:
      {} /* functions to invoke when user goes inactive (options.threshold) */,
    [EVENT_WARNING]:
      {} /* functions to invoke when warning user about inactivity (options.warning) */,
    [EVENT_ACTIVITY]: {} /* functions to invoke any time a user makes a move */,
  };

  timer: IRefreshTokenTimer = {
    inactivity:
      null /* setInterval handle to determine whether the user is inactive */,
    keepAlive:
      null /* setInterval handle for ping handler (options.frequency) */,
  };

  eventSubscription$ = new Subscription();

  publish(event: string) {
    if (!this.options.enabled) return;

    const spaces = Object.keys(this.events[event]);

    if (!event || !spaces.length) return;

    spaces.forEach((space) => {
      this.events[event][space] && this.events[event][space]();
    });
  }

  subscribe(event: string, callback: () => void) {
    if (!event || typeof callback !== 'function') return;

    const eventObj = this._namespace(event, callback);

    this.events[eventObj.name][eventObj.space] = callback;

    !this.options.enabled && this.enable();
  }

  unsubscribe(event: string, callback: () => void) {
    const eventObj = this._namespace(event, callback);

    if (!eventObj.space) {
      this.events[eventObj.name] = {};
      return;
    }

    this.events[eventObj.name][eventObj.space] = null;
  }

  _namespace(event: string, callback: () => void) {
    const eventObj = event.split('.');

    if (!eventObj[1] && typeof callback === 'function') {
      /* if no namespace, use callback and strip all linebreaks and spaces */
      eventObj[1] = callback
        .toString()
        .substr(0, 150)
        .replace(/\r?\n|\r|\s+/gm, '');
    }

    return {
      name: eventObj[0],
      space: eventObj[1],
    };
  }

  regularActivityMonitor() {
    this.user.active = true;
    this.user.action = Date.now();

    this.publish(EVENT_ACTIVITY);

    if (this.user.warning) {
      this.user.warning = false;
      this.publish(EVENT_KEEPALIVE);
    }
  }

  dynamicActivity() {
    this.regularActivityMonitor();
  }

  activity() {
    this.dynamicActivity();
  }

  reactivate() {
    this.enableIntervals();
    this.dynamicActivity = this.regularActivityMonitor;
  }

  enableIntervals() {
    this.timer.keepAlive = setInterval(() => {
      this.publish(EVENT_KEEPALIVE);
    }, this.options.keepAlive * MILLISECOND);

    this.timer.inactivity = setInterval(() => {
      const now = Date.now();
      const warning =
        now - (this.options.inactive - this.options.warning) * MILLISECOND;
      const inactive = now - this.options.inactive * MILLISECOND;

      /* should we display warning */
      if (!this.user.warning && this.user.action <= warning) {
        this.user.warning = true;
        this.publish(EVENT_WARNING);
      }

      /* should user be considered inactive? */
      if (this.user.active && this.user.action <= inactive) {
        this.user.active = false;
        this.publish(EVENT_INACTIVE);

        if (this.options.disableOnInactive) {
          this.disable();
        } else {
          this.disableIntervals(); //user inactive is known, lets stop checking, for now
          this.dynamicActivity = this.reactivate; //hot swap method that handles document event watching
        }
      }
    }, this.options.monitor * MILLISECOND);
  }

  enable() {
    const events$ = this.options.DOMevents.map((eventName) =>
      fromEvent(document, eventName)
    );
    this.eventSubscription$ = merge(...events$).subscribe(
      this.activity.bind(this)
    );

    this.options.enabled = true;
    this.user.warning = false;

    this.enableIntervals();
  }

  disableIntervals() {
    if (!this.timer.inactivity || !this.timer.keepAlive) {
      return;
    }

    clearInterval(this.timer.inactivity);
    clearInterval(this.timer.keepAlive);

    delete this.timer.inactivity;
    delete this.timer.keepAlive;
  }

  disable() {
    this.options.enabled = false;

    this.disableIntervals();

    this.eventSubscription$.unsubscribe();
  }
}
