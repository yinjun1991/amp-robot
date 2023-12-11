export default defineContentScript({
  matches: ['*://*.amap.com/*'],
  runAt: 'document_start',
  main() {
    // ...
  }
});
