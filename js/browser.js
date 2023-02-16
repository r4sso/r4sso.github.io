$(document).ready(function() {
    if ((navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.some(brand => brand.brand === 'Microsoft Edge' && brand.version >= 12)) || (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)) {
      $('#browser').show();
    }
  });
  