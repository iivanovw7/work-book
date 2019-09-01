// Pages list available for guest users and logged in users, used in storeon
export const PAGES = [
  {
    localeName: 'home',
    title: {
      eng: 'Home',
      rus: 'Главная'
    },
    url: '/',
    icon: 'home',
    isPublic: true
  },
  {
    localeName: 'addPost',
    title: {
      eng: 'Create',
      rus: 'Написать'
    },
    url: '/posts/new',
    icon: 'add_box',
    isPublic: false
  },
  {
    localeName: 'profile',
    title: {
      eng: 'Profile',
      rus: 'Профиль'
    },
    url: '/user/',
    icon: 'account_box',
    isPublic: false
  }
];
