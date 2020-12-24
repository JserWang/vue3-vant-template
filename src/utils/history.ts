import { Session } from '@/utils/storage';

const PAGE_HISTORY_KEY = 'PAGE_HISTORY';

export const HOME_PATH = '/';

class History {
  private history: string[];

  constructor() {
    this.history = Session.get(PAGE_HISTORY_KEY) || this.init();
  }

  push(path: string) {
    this.history.push(path);
    this.stack();
  }

  remove(path?: string | null) {
    if (path) {
      this.history.splice(this.history.lastIndexOf(path), 1);
    } else {
      this.history.pop();
    }
    this.stack();
  }

  list() {
    return this.history;
  }

  has(path: string) {
    return this.history.indexOf(path) !== -1;
  }

  getLast(): string {
    const { history } = this;
    const lastIndex = history.length - 1 > 0 ? history.length - 2 : 0;
    return history[lastIndex];
  }

  init() {
    this.history = [HOME_PATH];
    this.stack();
    return this.history;
  }

  size(): number {
    return this.history.length;
  }

  private stack() {
    Session.set(PAGE_HISTORY_KEY, this.history);
  }
}

export const history = new History();
