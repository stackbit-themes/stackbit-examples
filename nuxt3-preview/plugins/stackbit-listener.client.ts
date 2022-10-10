import { contentChangeEmitter } from "~~/utils/emitter";

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.hook('app:mounted', () => {
    window.addEventListener('stackbitObjectsChanged', (e: any) => {
      console.log('Got stackbitObjectsChanged event, emitting to listeners', e);
      contentChangeEmitter.emit('change');
      e.preventDefault();
    });
  });
});
