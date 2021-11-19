const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    role: state => state.user.role,
    checkedArr: state => state.user.checkedArr,
    status: state => state.user.status,
    userConfig: state => state.user.userConfig,
  }
  export default getters