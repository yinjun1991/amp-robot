import { sleep } from './utils/sleep';

export class Crawler {
  constructor() {}

  async start() {
    return this.parseAreas();
  }

  async parseAreas() {
    const areas = document.querySelector('.classify-area-level1');
    if (!areas) {
      throw new Error('没有找到区域列表');
    }

    // 朝阳区 东城区
    const districts = areas.querySelectorAll('li');

    for (const district of districts) {
      const name = district.querySelector('.cl-area-name') as HTMLElement;
      if (!name) {
        throw new Error('找不到区域名称');
      }

      const nameText = name.innerHTML.trim();
      if (nameText.includes('附近')) {
        console.log('附近', nameText);
        continue;
      }

      console.log('=== start district', nameText);

      // 点击区域名称，触发显示子区域列表
      name.click();

      await sleep(500);

      const subDistrictsPanel = document.querySelector('.classify-area-level2');
      if (!subDistrictsPanel) {
        throw new Error(`找不到子区域列表: ${nameText}`);
      }

      const subDistricts = subDistrictsPanel.querySelectorAll('li');

      for (const subDistrict of subDistricts) {
        console.log(
          '=== start district',
          nameText,
          'child',
          subDistrict.innerText
        );

        // 触发真正的网络请求
        subDistrict.click();

        await sleep(500);
      }

      console.log('=== end district', nameText);
    }
  }
}
