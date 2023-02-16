if ((navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands.some(brand => brand.brand === 'Microsoft Edge' && brand.version >= 12)) || (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0)) {
    alert('Please note that your browser is not fully compatible with this website. Some features may not work as expected.');
  }
  