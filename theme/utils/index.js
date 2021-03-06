export const getRedirectUrl = pathname => {
  if (pathname === '/') {
    return '/zh-cn/';
  }

  if (pathname === '/zh-cn/') {
    return '/';
  }

  if (pathname.startsWith('/zh-cn')) {
    return pathname.replace('/zh-cn', '/en');
  }

  if (pathname.startsWith('/en')) {
    return pathname.replace('/en', '/zh-cn');
  }

  return pathname;
};

export const switchLang = () => {
  window.location.href = getRedirectUrl(window.location.pathname);
};
