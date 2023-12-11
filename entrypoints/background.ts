import { getValueByKey } from '@/crawler/utils/adcode';

export default defineBackground(() => {
  const geoobjs: Record<string, string> = {};

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      const url = details.url;
      if (url.includes('service/poiInfo')) {
        const _url = new URL(url);
        const geoobj = _url.searchParams.get('geoobj');
        if (!geoobj) {
          console.warn('[background] missing geoobj', url);
          return;
        }

        const classifydata = _url.searchParams.get('classify_data');
        if (!classifydata) {
          console.warn('[background] missing classifydata', url);
          return;
        }

        const adcode = getValueByKey(classifydata, 'adcode');
        const custom = getValueByKey(classifydata, 'custom');
        const idx = custom.indexOf('business_area:');
        if (idx > -1) {
          const areaName = custom.indexOf('+', idx + 1);
          geoobjs[`${adcode}_${areaName}`] = geoobj;
        }
      }
    },
    { urls: ['<all_urls>'] },
    ['blocking']
  );
});
