'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Ngrx-Data</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NgrxDataLibModule.html" data-type="entity-link">NgrxDataLibModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddEntityToState.html" data-type="entity-link">AddEntityToState</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMany.html" data-type="entity-link">AddMany</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEntityState.html" data-type="entity-link">CreateEntityState</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteAll.html" data-type="entity-link">DeleteAll</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteAllEntityStates.html" data-type="entity-link">DeleteAllEntityStates</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteEntityFromState.html" data-type="entity-link">DeleteEntityFromState</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteEntityState.html" data-type="entity-link">DeleteEntityState</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteMany.html" data-type="entity-link">DeleteMany</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityArrayMapper.html" data-type="entity-link">EntityArrayMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityService.html" data-type="entity-link">EntityService</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityStateCollectionAdapter.html" data-type="entity-link">EntityStateCollectionAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImmutableObservable.html" data-type="entity-link">ImmutableObservable</a>
                            </li>
                            <li class="link">
                                <a href="classes/JsonFormatConverter.html" data-type="entity-link">JsonFormatConverter</a>
                            </li>
                            <li class="link">
                                <a href="classes/MakeRequest.html" data-type="entity-link">MakeRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/NameValue.html" data-type="entity-link">NameValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestError.html" data-type="entity-link">RequestError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestProvider.html" data-type="entity-link">RequestProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestSuccess.html" data-type="entity-link">RequestSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/Update.html" data-type="entity-link">Update</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMany.html" data-type="entity-link">UpdateMany</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link">DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgrxDataConfigurationService.html" data-type="entity-link">NgrxDataConfigurationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgrxDataEffects.html" data-type="entity-link">NgrxDataEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DataWrapper.html" data-type="entity-link">DataWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityStatesCollection.html" data-type="entity-link">EntityStatesCollection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedEntityState.html" data-type="entity-link">ExtendedEntityState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataMapper.html" data-type="entity-link">IDataMapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormatConverter.html" data-type="entity-link">IFormatConverter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgrxDataConfiguration.html" data-type="entity-link">NgrxDataConfiguration</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});