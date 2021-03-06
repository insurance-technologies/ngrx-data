import { from } from 'rxjs';

/*
 * Public API Surface of ngrx-data-lib
 */

//services
export * from './lib/services/public-services';

//state interface
export { EntityStatesCollection } from './lib/state/entity-states-collection-adapter';

//reducer
export { reducer } from './lib/state/state';

//actions
export * from './lib/state/db-actions';
export * from './lib/state/action.functions';
export * from './lib/http/http-method';

//models
export * from './lib/models/public-models';

//ImmutableObservable
export * from './lib/helpers/immutable-observable';

//data format
export * from './lib/data-format/format-converter';
export * from './lib/data-format/json-format-converter';
export * from './lib/data-format/text-format-converter';
export * from './lib/data-format/format-converter.factory';

//data mapping
export * from './lib/data-mapping/datamapper';
export * from './lib/data-mapping/entity-array-mapper';

//http
export * from './lib/http/request-provider';

//library module
export * from './lib/ngrx-data-lib.module';
