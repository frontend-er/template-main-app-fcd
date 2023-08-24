import axios from 'axios';
import { BASE_FILTERS_URL } from '~shared/api/msw/config/constants';


export const getFilterHandlersHandlers =  async () => {
  return  await axios.get(`${BASE_FILTERS_URL}`)
}

