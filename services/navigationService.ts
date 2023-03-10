import {NavigationActions} from 'react-navigation';;
import {DrawerActions, StackActions} from '@react-navigation/native';
let _navigator: { dispatch: (arg0: any) => void; };

export function setNavigator(nav: any) {
  _navigator = nav;
}

export function navigateTo(routeName: any, params = {}) {
  if (_navigator && routeName) {
    const action = NavigationActions.navigate({routeName, params});
    _navigator.dispatch(action);
  }
}

export function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

export function resetTo(routeName: any) {
  const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({routeName: routeName})],
  });
  _navigator.dispatch(resetAction);
}

export function closeDrawerMenu() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

// Gets the current screen from navigation state
export function getActiveRouteName(state: { routes: { [x: string]: any; }; index: string | number; }) {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
}