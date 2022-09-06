// See https://v3-migration.vuejs.org/breaking-changes/events-api.html#event-bus
import { TinyEmitter } from 'tiny-emitter';
export const contentChangeEmitter = new TinyEmitter();