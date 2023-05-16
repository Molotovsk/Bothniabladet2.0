import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tips`;

export const tipService = {
    submitTip
};

export async function submitTip(tip) {
    await fetchWrapper.post(`${baseUrl}/tip`, tip);
}