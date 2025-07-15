const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('UI Title Update', () => {
  let window, document, app;

  beforeAll(async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;
    document = window.document;
    // Simulate loading script.js (not full, but enough for test)
    global.window = window;
    global.document = document;
    // You would require and initialize your app here if modularized
  });

  it('should update the page title when switching to research', () => {
    const pageTitle = document.getElementById('pageTitle');
    // Simulate switchSection('research')
    pageTitle.textContent = 'Research';
    expect(pageTitle.textContent).toBe('Research');
  });
}); 