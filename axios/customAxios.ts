import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

interface Options {
    data?: any;
    actionOnSuccess?: (data: unknown) => void;
    actionOnFailure?: (error: unknown) => void;
    loadingString?: string;
    successString?: string;
}

export const customAxios = async (
    method: Method,
    url: string,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    options?: Options
) => {
    const getAxiosInstance = () => {
        const axiosConfig = { url: `/api/${url}`, method, data: options?.data };

        setFetching(true);

        return axios(axiosConfig)
            .then((res) => {
                setFetching(false);

                if (res.status === 200) {
                    options?.actionOnSuccess?.(res.data);
                    return res.data;
                } else {
                    const errorMsg =
                        res.data?.message || 'Something went wrong!';
                    options?.actionOnFailure?.(errorMsg);
                    return Promise.reject(errorMsg);
                }
            })
            .catch((err) => {
                setFetching(false);
                const errorMsg = err.response?.data?.error || 'Server error!';
                options?.actionOnFailure?.(errorMsg);
                return Promise.reject(errorMsg);
            });
    };

    const promise = getAxiosInstance();

    if (options?.loadingString || options?.successString) {
        await toast.promise(promise, {
            loading: options.loadingString || 'Loading...',
            success: options.successString || 'Success!',
            error: (err) => `${err}`
        });
    }

    return promise;
};
