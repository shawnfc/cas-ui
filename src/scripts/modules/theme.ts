angular.module('cas.theme', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'ngSanitize']).config(($mdThemingProvider) => {

  // Extend the orange theme with a few different colors
  var thdOrangeMap = $mdThemingProvider.extendPalette('orange', {
    '500': 'f96302',
    '900': '00af4d',
    'contrastDefaultColor': 'light',
  });

  // Register the new color palette map with the name
  $mdThemingProvider.definePalette('thd-orange', thdOrangeMap);

  var thdPalette = $mdThemingProvider.extendPalette('grey', {
    '500': '2b3134'
  });

  $mdThemingProvider.definePalette('thd-grey', thdPalette);

  // Use that theme for the primary intentions
  $mdThemingProvider
  .theme('default')
  .primaryPalette('thd-grey', {
    'default': '900',
    'hue-3': '500'
  })
  .accentPalette('thd-orange', {
    'default': '500',
    'hue-1': '900'
  })
  .warnPalette('red');
});
