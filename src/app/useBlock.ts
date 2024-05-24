import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";

export const useLeavePageConfirm = (
  isConfirm = true,
  message = "Are you sure want to leave this page?"
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        // console.log('calling the api')
        throw "Route Canceled";
      }
    };

    const handleBeforeUnload = (event: any) => {
        event.preventDefault();
        event.returnValue = true;
        return (event.returnValue = '');
    };

    const handleUnload = async () => {
        debugger
       console.log('calling the api');
    };

    Router.events.on("routeChangeStart", handler);
    Router.events.on('beforeHistoryChange', handler);
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    window.addEventListener('unload', handleUnload, { capture: true });

    window.addEventListener('popstate', function (e: any) {
        console.log(e);
        debugger;
        if (e.state !== null) {
            e.preventDefault();
            e.returnValue = true;
            return (e.returnValue = '');
        }
    });


    return () => {
      Router.events.off('beforeHistoryChange', handler);
      Router.events.off("routeChangeStart", handler);
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('popstate', (event) => {});
    };
  }, [isConfirm, message]);
};