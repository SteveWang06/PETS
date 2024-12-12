import { loginRequest, loginSuccess, loginFailure } from '../actions/authAction';
import { ApiPaths } from '../../../src/services/ApiPaths'; // Đây là function để gọi API login

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === loginRequest) {
    // Dispatch action loginRequest
    const { email, password } = action.payload;
    ApiPaths.loginApi(email, password)
      .then((response) => {
        // Dispatch action loginSuccess khi login thành công
        store.dispatch(loginSuccess(response.data.token));
      })
      .catch((error) => {
        // Dispatch action loginFailure khi login thất bại
        store.dispatch(loginFailure(error.message));
      });
  }
  return next(action);
};

export default authMiddleware;
