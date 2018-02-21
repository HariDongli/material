export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 600,
          }
        }
      },
      {
        path: 'dossiers',
        data: {
          menu: {
            title: 'general.menu.dossiers.title',
            icon: 'ion-ios-list-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'creation',
            data: {
              menu: {
                title: 'general.menu.dossiers.new',
                icon: 'ion-plus',
                selected: false,
                expanded: false,
                order: 600,
              }
            },
          }
        ]
      }
    ]
  }
];
