import { MUser } from '@/apis/model';
import Request from '@/utils/request';

enum UserApi {
  info = '/user/info',
}

class UserService {
  fetch() {
    return Request.get<MUser>(UserApi.info);
  }
}

export default new UserService();
