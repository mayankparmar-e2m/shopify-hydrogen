import { useEffect } from "react";

export function useOutsideClick(ref,callBack=undefined) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        debugger
        if (ref.current && !ref.current.contains(event.target)) {
          if(callBack){
            
            callBack()
          }
        }
      }
      // Bind the event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  }