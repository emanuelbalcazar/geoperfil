export const navigationRoutes = {
    root: {
        name: '/',
        displayName: 'navigationRoutes.home'
    },
    routes: [
        {
            name: 'dashboard',
            displayName: 'menu.dashboard',
            meta: {
                iconClass: 'fa fa-home'
            }
        },
        {
            name: 'maps',
            displayName: 'menu.maps',
            meta: {
                iconClass: 'fa fa-map'
            },
            disabled: true,
            children: [
                {
                    name: 'leaflet-maps',
                    displayName: 'Ver Mapa'
                }
            ]
        },
        {
            name: 'selectors',
            displayName: 'Selectores',
            meta: {
                iconClass: 'fa fa-scissors',
            },
            disabled: true,
            children: [
                {
                    name: 'list-selectors',
                    displayName: 'Listar Selectores',
                }
            ],
        },
        {
            name: 'equations',
            displayName: 'Ecuaciones',
            meta: {
                iconClass: 'fa fa-search',
            },
            disabled: true,
            children: [
                {
                    name: 'list-equations',
                    displayName: 'Listar Ecuaciones',
                }
            ],
        },
        {
            name: 'careers',
            displayName: 'Carreras',
            meta: {
                iconClass: 'fa fa-book  ',
            },
            disabled: true,
            children: [
                {
                    name: 'list-careers',
                    displayName: 'Listar Carreras',
                }
            ],
        },
        {
            name: 'institutions',
            displayName: 'Instituciones',
            meta: {
                iconClass: 'fa fa-university',
            },
            disabled: true,
            children: [
                {
                    name: 'list-institutions',
                    displayName: 'Listar Instituciones',
                }
            ],
        },
        /* {
            name: 'statistics',
            displayName: 'menu.statistics',
            meta: {
                iconClass: 'vuestic-iconset-statistics',
            },
            disabled: true,
            children: [
                {
                    name: 'charts',
                    displayName: 'menu.charts',
                },
                {
                    name: 'progress-bars',
                    displayName: 'menu.progressBars',
                },
            ],
        },
        {
            name: 'forms',
            displayName: 'menu.forms',
            meta: {
                iconClass: 'vuestic-iconset-forms',
            },
            disabled: true,
            children: [
                {
                    name: 'form-elements',
                    displayName: 'menu.formElements',
                },
                {
                    name: 'medium-editor',
                    displayName: 'menu.mediumEditor',
                },
            ],
        },
        {
            name: 'tables',
            displayName: 'menu.tables',
            meta: {
                iconClass: 'vuestic-iconset-tables',
            },
            children: [
                {
                    name: 'markup',
                    displayName: 'menu.markupTables',
                },
                {
                    name: 'data',
                    displayName: 'menu.dataTables',
                },
            ],
        },
        {
            name: 'ui',
            displayName: 'menu.uiElements',
            meta: {
                iconClass: 'vuestic-iconset-ui-elements',
            },
            disabled: true,
            children: [
                {
                    name: 'buttons',
                    displayName: 'menu.buttons',
                },
                {
                    name: 'cards',
                    displayName: 'menu.cards',
                },
                {
                    name: 'chat',
                    displayName: 'menu.chat',
                },
                {
                    name: 'chips',
                    displayName: 'menu.chips',
                },
                {
                    name: 'collapses',
                    displayName: 'menu.collapses',
                },
                {
                    name: 'colors',
                    displayName: 'menu.colors',
                },
                {
                    name: 'color-pickers',
                    displayName: 'menu.colorPickers',
                },
                {
                    name: 'file-upload',
                    displayName: 'menu.fileUpload',
                },
                {
                    name: 'grid',
                    displayName: 'menu.grid',
                },
                {
                    name: 'icon-sets',
                    displayName: 'menu.icons',
                    children: [
                        {
                            displayName: 'concrete',
                            name: 'icon-set',
                        },
                    ],
                },
                {
                    name: 'lists',
                    displayName: 'menu.lists',
                },
                {
                    name: 'modals',
                    displayName: 'menu.modals',
                },
                {
                    name: 'notifications',
                    displayName: 'menu.notifications',
                },
                {
                    name: 'popovers',
                    displayName: 'menu.popovers',
                },
                {
                    name: 'rating',
                    displayName: 'menu.rating',
                },
                {
                    name: 'sliders',
                    displayName: 'menu.sliders',
                },
                {
                    name: 'spacing',
                    displayName: 'menu.spacing',
                },
                {
                    name: 'spinners',
                    displayName: 'menu.spinners',
                },
                {
                    name: 'tabs',
                    displayName: 'menu.tabs',
                },
                {
                    name: 'timelines',
                    displayName: 'menu.timelines',
                },
                {
                    name: 'tree-view',
                    displayName: 'menu.treeView',
                },
                {
                    name: 'typography',
                    displayName: 'menu.typography',
                },
            ],
        },

        {
            name: 'pages',
            displayName: 'menu.pages',
            meta: {
                iconClass: 'vuestic-iconset-files',
            },
            disabled: true,
            children: [
                {
                    name: 'login',
                    displayName: 'Login/Signup',
                },
                {
                    name: '404-pages',
                    displayName: '404 Pages',
                },
            ],
        }, */
    ]
}
