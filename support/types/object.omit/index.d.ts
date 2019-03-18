type Omit<GType, GKeys extends keyof GType> = Pick<GType, Exclude<keyof GType, GKeys>>;

/**
 * Return a copy of an object excluding the given key, or array of keys. Also accepts an optional filter function as the last argument."
 *
 * @param object
 * @param keys
 */
declare function omit<GObject extends object, GKey extends keyof GObject>(
  object: GObject,
  keys: GKey[],
): Omit<GObject, GKey>;
declare function omit<GObject extends object, GKey extends keyof GObject>(
  object: GObject,
  key: GKey,
): Omit<GObject, GKey>;
declare function omit<GObject extends object, GKey extends keyof GObject>(
  object: GObject,
  fn: (val: GObject[GKey], key: GKey, obj: GObject) => boolean,
): object;

export = omit;