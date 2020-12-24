/**
 * Local为本地缓存，Session为会话缓存
 *
 * 使用方法：
 * import { Local, Session } from '@/utils/storage'
 *
 * Local.set<string>('my_key', my_value)
 * Local.set<string>('my_key', my_value, 30)
 *
 * Local.get<string>('my_key')
 *
 * Local.del('my_key')
 *
 * Local.has('my_key')
 *
 * Local.clear()
 */

class StorageItem<T> {
  data: T;
  expires?: number | null;
  constructor(data: T, expires?: number) {
    this.data = data;
    this.expires = expires ? Date.now() + expires : null;
  }
}

class ExpireStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }
  /**
   * 存值，这里注意无需进行Object的转换，存什么都可以，方法内部会自动做类型转换
   * @param {*} key 存储key
   * @param {*} value 存储值
   * @param {*} time 有效时间，默认为永久
   */
  set<T>(key: string, value: T, expires?: number) {
    try {
      const item = new StorageItem(value, expires);
      this.storage.setItem(key, JSON.stringify(item));
    } catch (err) {
      throw `Storage setItem ${key} error: ${JSON.stringify(err)}`;
    }
  }

  /**
   * 取值，这里如果是JsonObject类型会自动帮你转回原类型
   * 取值后无需再多做一次类型转换
   * @param {*} key
   */
  get<T>(key: string): T | null {
    if (!key) {
      return null;
    }
    try {
      const value = this.storage.getItem(key);
      if (!value) {
        return null;
      }
      const storageItem: StorageItem<T> = JSON.parse(value);
      const { expires, data } = storageItem;
      if (expires && Date.now() >= expires) {
        this.del(key);
        return null;
      }
      return data as T;
    } catch (err) {
      throw `Storage getItem ${key} error: ${JSON.stringify(err)}`;
    }
  }

  /**
   * 判断指定key是否存在
   * @param key 存储key
   */
  has(key: string) {
    return this.get(key) !== null;
  }

  /**
   * 删除指定key的值
   * @param key 存储key
   */
  del(key: string) {
    this.storage.removeItem(key);
  }

  /**
   * 清空存储
   */
  clear() {
    this.storage.clear();
  }
}

export const Local = new ExpireStorage(window.localStorage);

export const Session = new ExpireStorage(window.sessionStorage);
