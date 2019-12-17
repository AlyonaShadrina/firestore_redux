import { toast, ToastOptions } from 'react-semantic-toasts';


const showToast = (toastProps: ToastOptions) => {
    toast(
        {
            title: 'Something happened.',
            type: 'info',
            time: 5000,
            ...toastProps,
        },
        // () => console.log('toast closed'),
        // () => console.log('toast clicked'),
        // () => console.log('toast dismissed')
    );
};

export default showToast;
