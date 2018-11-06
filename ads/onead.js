import {validateData} from '../3p/3p';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function onead(global, data) {
  validateData(data, [], ['playmode','uid', 'pid','host']);
  global.ONEAD = {
    playmode:data.playmode,
    uid:data.uid,
    pid:data.pid,
    host:data.host
  }
  createOneadSlot(global);
  createAdUnit(global);
}
/**
 * @param {!Window} win
 */
function createOneadSlot(win){
    const slot = document.createElement('div');
    slot.id = "onead-amp";
    win.document.getElementById('c').appendChild(slot);
}
/**
 * @param {!Window} win
 */
function createAdUnit(win){
    let src = 'https://ad-specs.guoshipartners.com/static/js/onead-amp.min.js';
    let js = document.createElement('script');
    js.async = false;
    js.onload = () => Guoshi.queryAd.amp.setup({
        playMode:win.ONEAD.playMode,
        uid:win.ONEAD.uid,
        pid:win.ONEAD.pid,
        host:win.ONEAD.host
    });
    js.type = 'text/javascript';
    js.src = src;
    win.document.head.appendChild(js);
}