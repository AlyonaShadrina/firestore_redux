import { toast, ToastOptions } from 'react-semantic-toasts';


const showToast = (toastProps: ToastOptions) => {
    toast(
        {
            type: 'info',
            time: 5000,
            ...toastProps,
        },
        // () => console.log('toast closed'),
        // () => console.log('toast clicked'),
        // () => console.log('toast dismissed')
    );
};

export const showErrorToast = (title: string) => {
    showToast({
        title,
        type: 'error',
        time: 6000,
    });
};

export const showSuccessToast = (title: string) => {
    showToast({
        title,
        type: 'success',
        time: 13000,
    });
};

export default showToast;
