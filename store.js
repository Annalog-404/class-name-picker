// Saves the classes on this device. Shared by the teacher screen and Spin Time.
// Uses the browser's built-in database (IndexedDB), which has room for several classes full of
// photos; falls back to simple storage (localStorage, about 5 MB) where the database is blocked.
//
// What is saved:
//   "meta"        { current: classId, classes: [{ id, name, count }] }   (the class tabs)
//   "class:<id>"  { id, className, students, noRepeat, sound, history, lang, theme, groupMode, groupNum, groups }
window.STORE = (() => {
  const DB_NAME = 'class-name-picker', OS = 'kv';
  const OLD_KEY = 'classNamePicker.v1'; // where the first version saved its one class

  let dbPromise = null;
  function db() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) { reject(new Error('no indexedDB')); return; }
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(OS);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        req.onblocked = () => reject(new Error('blocked'));
      });
    }
    return dbPromise;
  }

  async function get(key) {
    try {
      const d = await db();
      return await new Promise((resolve, reject) => {
        const q = d.transaction(OS).objectStore(OS).get(key);
        q.onsuccess = () => resolve(q.result);
        q.onerror = () => reject(q.error);
      });
    } catch (e) {
      try { const v = localStorage.getItem('cnp:' + key); return v ? JSON.parse(v) : undefined; } catch (_) { return undefined; }
    }
  }

  // Throws if the device is out of room, so the caller can tell the teacher.
  async function put(key, value) {
    let d = null;
    try { d = await db(); } catch (e) { /* fall back below */ }
    if (d) {
      await new Promise((resolve, reject) => {
        const tx = d.transaction(OS, 'readwrite');
        tx.objectStore(OS).put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('aborted'));
      });
    } else {
      localStorage.setItem('cnp:' + key, JSON.stringify(value));
    }
  }

  async function remove(key) {
    try {
      const d = await db();
      await new Promise((resolve, reject) => {
        const tx = d.transaction(OS, 'readwrite');
        tx.objectStore(OS).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      try { localStorage.removeItem('cnp:' + key); } catch (_) {}
    }
  }

  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  function blankClass(name) {
    return {
      id: uid(), className: name || 'My Class', students: [], noRepeat: true, sound: true, history: [], lang: 'en', theme: 'balloons',
      // Group Time: "4 groups" or "groups of 4", the last groups made, and their names
      groupMode: 'count', groupNum: 4, groups: null, groupNameStyle: 'animals', groupLabels: null, groupAnim: 'boom'
    };
  }

  // The class tabs. The first time, brings over the class saved by the first version of the app.
  async function meta() {
    let m = await get('meta');
    if (m && Array.isArray(m.classes) && m.classes.length) return m;
    let first = blankClass();
    try {
      const old = localStorage.getItem(OLD_KEY);
      if (old) first = Object.assign(first, JSON.parse(old), { id: first.id });
    } catch (e) {}
    await put('class:' + first.id, first);
    m = { current: first.id, classes: [{ id: first.id, name: first.className, count: first.students.length }] };
    await put('meta', m);
    try { localStorage.removeItem(OLD_KEY); } catch (e) {}
    return m;
  }

  async function getClass(id) {
    const c = await get('class:' + id);
    return c ? Object.assign(blankClass(), c, { id }) : null;
  }

  // The class the teacher has picked (what Spin Time spins).
  async function currentClass() {
    const m = await meta();
    let c = await getClass(m.current);
    if (!c) { c = await getClass(m.classes[0].id); m.current = m.classes[0].id; await put('meta', m); }
    return { meta: m, cls: c || blankClass() };
  }

  // Names for the children's screens. Teachers save full names; children see the first name only.
  // When two children share a first name, the first letter of the last name is added ("Lily S."),
  // or the whole last name if that matches too. "Ma. Clara Santos" shows as "Ma. Clara".
  const SUFFIX = /^(jr|sr|ii|iii|iv|v)\.?$/i;
  const PARTICLE = /^(de|del|dela|delos|de\.|la|las|los|san|santa|sta\.?|sto\.?|van|von|da|di|du)$/i;
  function nameParts(full) {
    const p = String(full || '').trim().split(/\s+/).filter(Boolean);
    const firstLen = p.length > 1 && /^m[aª]\.?$/i.test(p[0]) ? 2 : Math.min(1, p.length);
    const first = p.slice(0, firstLen).join(' ');
    const rest = p.slice(firstLen).filter(w => !SUFFIX.test(w));
    if (!rest.length) return { first, last: '' };
    let i = rest.length - 1;
    while (i > 0 && PARTICLE.test(rest[i - 1])) i--;   // "Dela Cruz", "De los Santos"
    return { first, last: rest.slice(i).join(' ') };
  }
  function shortNames(students) {
    const out = new Map(), byFirst = new Map();
    const key = x => x.toLocaleLowerCase();
    for (const s of students) {
      const n = nameParts(s.name);
      const k = key(n.first);
      if (!byFirst.has(k)) byFirst.set(k, []);
      byFirst.get(k).push({ s, n });
    }
    for (const same of byFirst.values()) {
      if (same.length === 1) { out.set(same[0].s.id, same[0].n.first || String(same[0].s.name || '').trim()); continue; }
      const initial = x => x.n.last ? `${x.n.first} ${x.n.last.charAt(0).toLocaleUpperCase()}.` : x.n.first;
      const count = new Map();
      same.forEach(x => count.set(key(initial(x)), (count.get(key(initial(x))) || 0) + 1));
      same.forEach(x => out.set(x.s.id, count.get(key(initial(x))) === 1 ? initial(x)
        : (x.n.last ? `${x.n.first} ${x.n.last}` : String(x.s.name || '').trim())));
    }
    return out;
  }

  return {
    meta, getClass, currentClass, blankClass, shortNames,
    putClass: c => put('class:' + c.id, c),
    deleteClass: id => remove('class:' + id),
    putMeta: m => put('meta', m)
  };
})();
