import { useEffect } from 'react';
import Router from 'next/router';
import { useBeforeUnload } from 'react-use';
// import { useRouter } from 'next/navigation'

export const useLeavePageConfirm = (
    isConfirm: boolean = true,
    message: string = 'Are you sure want to leave this page?'
) => {
    // const router = useRouter();
    useBeforeUnload(isConfirm, message);

    useEffect(() => {
        const handler = () => {
            if (isConfirm && !window.confirm(message)) {
                throw 'Route Canceled';
            }
        };

        Router.events.on('beforeHistoryChange', handler);

        return () => {
            Router.events.off('beforeHistoryChange', handler);
        };
    }, [isConfirm, message]);

    // useEffect(() => {
    //     router.beforePopState(({ url, as, options }) => {
    //       // I only want to allow these two routes!
    //       if (as !== '/' && as !== '/other') {
    //         // Have SSR render bad routes as a 404.
    //         window.location.href = as
    //         return false
    //       }

    //       return true
    //     })
    //   }, [router])
};
