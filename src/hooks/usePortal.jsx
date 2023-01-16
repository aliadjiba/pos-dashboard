import MuiPortal from '@mui/base/Portal';
import { useEffect, useRef, useState } from 'react';

export default function usePortal() {
  const ref = useRef(null);
    const [portalRef, setPortalRef] = useState(null);
  useEffect(() => {
    setPortalRef(ref);
  }, [ref]);
  const Portal = ({children}) =>(portalRef&&<MuiPortal container={portalRef.current}>
  {children}
  </MuiPortal>);
  return [Portal,ref]
}