import { useQuery } from 'react-query';
import { getUserById } from '../redux/actions/user';
import { keys, USER_KEY } from './queryKeys';

export const useUser = (userId, options = {}) => {
    return useQuery(keys.user(userId), () => getUserById(userId), options);
};
