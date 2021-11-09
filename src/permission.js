import router from "./router";
import { getToken } from '@/utils/auth' // get token from cookie
// import { ElMessage } from 'element-plus'

const whiteList = ["/login", "/register"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  // finish progress bar
});
