// Background themes for the Spin Time screen. The teacher picks one on the teacher screen.
// Each theme has two background colours (top and bottom), the colours of the floating shapes,
// and the shapes themselves: a short piece of text ("+", "A") or the name of a picture below.
window.THEMES = (() => {
  // simple pictures, drawn on a 40 x 40 grid
  const PICS = {
    star: '<path d="M20 3l5 11 12 1.5-9 8.2 2.6 11.8L20 29.6 9.4 35.5 12 23.7 3 15.5 15 14z"/>',
    planet: '<circle cx="20" cy="20" r="10"/><ellipse cx="20" cy="20" rx="18" ry="5" fill="none" stroke="currentColor" stroke-width="2.5" transform="rotate(-20 20 20)"/>',
    atom: '<g fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="20" cy="20" rx="17" ry="6.5"/><ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(-60 20 20)"/></g><circle cx="20" cy="20" r="3.5"/>',
    flask: '<path d="M15 4h10v3h-1.5v9.5L33 32a3 3 0 0 1-2.6 4.5H9.6A3 3 0 0 1 7 32l9.5-15.5V7H15z"/>',
    leaf: '<path d="M34 6C18 6 6 14 6 28c0 2 .4 4 1 6 2-8 8-14 16-18-7 5-11 11-13 19 16 1 24-11 24-29z"/>',
    flower: '<circle cx="20" cy="11" r="6.5"/><circle cx="28.6" cy="17.2" r="6.5"/><circle cx="25.3" cy="27.3" r="6.5"/><circle cx="14.7" cy="27.3" r="6.5"/><circle cx="11.4" cy="17.2" r="6.5"/><circle cx="20" cy="20" r="5" fill="#fff" opacity=".75"/>',
    sun: '<circle cx="20" cy="20" r="8"/><g stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 3v5M20 32v5M3 20h5M32 20h5M8 8l3.5 3.5M28.5 28.5 32 32M8 32l3.5-3.5M28.5 11.5 32 8"/></g>',
    fish: '<path d="M4 20c6-8 16-10 24-4l8-6v20l-8-6c-8 6-18 4-24-4z"/><circle cx="12" cy="18" r="2" fill="#fff"/>',
    bubble: '<circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="14" cy="14" r="3"/>',
    paint: '<path d="M20 4c6 0 9 5 13 7s5 8 2 12 1 9-4 11-9 2-13 0-9-3-10-8 3-8 2-13S14 4 20 4z"/>',
    pencil: '<path d="M8 32l2.5-8.5L27 7l6 6-16.5 16.5z"/><path d="M8 32l2.5-8.5 6 6z" opacity=".6"/>',
    note: '<path d="M22 4v22.5A6.5 6.5 0 1 0 26 32V12l8 3V8z"/>',
    notes: '<path d="M14 8v19a5.5 5.5 0 1 0 3.5 5V15l14-3.5V24a5.5 5.5 0 1 0 3.5 5V3z"/>',
    book: '<path d="M4 8c6-2 11-1 16 2 5-3 10-4 16-2v24c-6-2-11-1-16 2-5-3-10-4-16-2z"/><path d="M20 10v24" stroke="#fff" stroke-width="1.5" opacity=".7"/>'
  };

  const LIST = {
    balloons: { name: 'Balloons', top: '#7FCBFF', bottom: '#C9B8FF', balloons: true,
      colors: ['#FFC83D', '#E8467C', '#23A86A', '#FFFFFF', '#7558F0', '#F08A24'] },
    math: { name: 'Math', top: '#FFE08A', darkText: true, bottom: '#FFB37A',
      colors: ['#E8467C', '#2F7BEA', '#23A86A', '#7558F0', '#FFFFFF'],
      items: ['1', '+', '2', '−', '3', '×', '5', '÷', '7', '=', '9', '0'] },
    reading: { name: 'Reading & Writing', top: '#B8F0D8', darkText: true, bottom: '#8FD3F4',
      colors: ['#2F7BEA', '#E8467C', '#7558F0', '#F08A24', '#FFFFFF'],
      items: ['A', 'a', 'book', 'B', 'b', 'pencil', 'C', 'c', 'book', 'D', 'e', '?'] },
    science: { name: 'Science', top: '#A6F0D0', darkText: true, bottom: '#7CC4FF',
      colors: ['#23A86A', '#2F7BEA', '#7558F0', '#FFFFFF', '#E8467C'],
      items: ['atom', 'flask', 'leaf', 'atom', 'flask', 'planet'] },
    space: { name: 'Space', top: '#3B3F94', bottom: '#6E4FB5',
      colors: ['#FFE48A', '#FFFFFF', '#FF9CC2', '#9FD8FF'],
      items: ['star', 'planet', 'star', 'star', 'planet', 'star'] },
    music: { name: 'Music', top: '#FFC2DC', darkText: true, bottom: '#C9B8FF',
      colors: ['#7558F0', '#E8467C', '#2F7BEA', '#FFFFFF'],
      items: ['note', 'notes', 'note', 'star', 'notes'] },
    art: { name: 'Art', top: '#FFE0B2', darkText: true, bottom: '#FFB3C7',
      colors: ['#E8467C', '#2F7BEA', '#FFC83D', '#23A86A', '#7558F0', '#F08A24'],
      items: ['paint', 'pencil', 'paint', 'star', 'paint', 'pencil'] },
    ocean: { name: 'Ocean', top: '#6FD3FF', bottom: '#2D7FD3',
      colors: ['#FFFFFF', '#FFC83D', '#FF9CC2', '#B8F0D8'],
      items: ['fish', 'bubble', 'bubble', 'fish', 'bubble'] },
    nature: { name: 'Nature', top: '#D4F7B0', darkText: true, bottom: '#8ED98F',
      colors: ['#23A86A', '#FFFFFF', '#FFC83D', '#E8467C', '#2D9C5A'],
      items: ['leaf', 'flower', 'sun', 'leaf', 'flower'] },
    philippines: { name: 'Philippines', top: '#8EC5FF', bottom: '#FFB8B8',
      colors: ['#FFD23F', '#FFFFFF', '#0038A8', '#CE1126'],
      items: ['sun', 'star', 'star', 'sun', 'star'] }
  };

  // Fill the background box with the theme's colours and floating shapes.
  function paint(key, box, still) {
    const th = LIST[key] || LIST.balloons;
    const root = document.documentElement.style;
    root.setProperty('--sky-top', th.top);
    root.setProperty('--sky-bottom', th.bottom);
    // light backgrounds get dark writing, dark or strong backgrounds get white writing
    root.setProperty('--on-sky', th.darkText ? '#1D2742' : '#FFFFFF');
    root.setProperty('--on-sky-shadow', th.darkText ? 'rgba(255,255,255,.55)' : 'rgba(29,39,66,.25)');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = th.top;
    box.innerHTML = '';
    if (still) return; // reduced motion: colours only
    const n = th.balloons ? 9 : 16;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.style.left = (3 + i * (94 / n) + Math.random() * 4) + '%';
      el.style.animationDuration = (16 + Math.random() * 14) + 's';
      el.style.animationDelay = (-Math.random() * 30) + 's';
      const col = th.colors[i % th.colors.length];
      if (th.balloons) {
        el.className = 'balloon';
        el.style.background = col;
        const sc = 0.6 + Math.random() * 0.7;
        el.style.width = 70 * sc + 'px'; el.style.height = 84 * sc + 'px';
      } else {
        el.className = 'floaty';
        el.style.color = col;
        el.style.setProperty('--turn', (Math.random() * 90 - 45) + 'deg');
        const size = 36 + Math.random() * 40;
        el.style.width = el.style.height = size + 'px';
        el.style.fontSize = size * 0.95 + 'px';
        const item = th.items[i % th.items.length];
        if (PICS[item]) el.innerHTML = `<svg viewBox="0 0 40 40" fill="currentColor">${PICS[item]}</svg>`;
        else el.textContent = item;
      }
      box.append(el);
    }
  }

  return { list: Object.keys(LIST).map(k => ({ key: k, name: LIST[k].name, top: LIST[k].top, bottom: LIST[k].bottom })), paint };
})();
